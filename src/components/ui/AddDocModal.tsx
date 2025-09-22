"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../ui/InputUser";
import Button from "../ui/ButtonUser";
import { useAuth } from "@/context/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  fname: string;
  lname: string;
  email: string;
  newPassword: string;
  location: string;
  cName: string;
};

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Autocomplete: new (input: HTMLInputElement, options?: any) => any;
        };
        event: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          clearInstanceListeners: (instance: any) => void;
        };
      };
    };
    initMap: () => void;
  }
}

export default function AddDocModal({ open, onClose }: Props) {
  const router = useRouter();
  const { token } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteInstance = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>();

  const { ref: locationRef, ...locationRegister } = register("location", {
    required: "Location is required",
  });

  // Load Google Places API
  const initializeAutocomplete = React.useCallback(() => {
    if (!autocompleteRef.current) {
      console.log("Autocomplete ref not ready");
      return;
    }

    if (!window.google) {
      console.log("Google Maps API not loaded");
      return;
    }

    if (!window.google.maps) {
      console.log("Google Maps object not available");
      return;
    }

    if (!window.google.maps.places) {
      console.log("Google Places library not loaded");
      setTimeout(initializeAutocomplete, 100); // Retry after 100ms
      return;
    }

    if (!window.google.maps.places.Autocomplete) {
      console.log("Autocomplete constructor not available");
      return;
    }

    try {
      autocompleteInstance.current = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          types: ["establishment", "geocode"],
          fields: ["place_id", "geometry", "name", "formatted_address"],
        }
      );

      autocompleteInstance.current.addListener("place_changed", () => {
        const place = autocompleteInstance.current?.getPlace();

        if (place?.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          setCoordinates({ lat, lng });
          setValue("location", place.formatted_address || place.name || "");
          console.log("Location selected:", {
            lat,
            lng,
            address: place.formatted_address,
          });
        }
      });

      console.log("Autocomplete initialized successfully");
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
      setServerError(
        "Failed to initialize location autocomplete. Please try refreshing the page."
      );
    }
  }, [setValue]);

  useEffect(() => {
    // Debug: Check if API key is loaded
    console.log(
      "Google Places API Key:",
      process.env.NEXT_PUBLIC_PLACES_API_KEY ? "✓ Loaded" : "❌ Missing"
    );

    if (!window.google && open) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Add global callback function
      window.initMap = () => {
        console.log("Google Maps API loaded successfully");
        setTimeout(initializeAutocomplete, 500); // Wait a bit more for places library
      };

      script.onerror = () => {
        console.error(
          "Failed to load Google Maps API. Please check your API key and enabled APIs."
        );
        setServerError(
          "Failed to load location services. Please check your API configuration."
        );
      };

      document.head.appendChild(script);
    } else if (window.google && open) {
      console.log("Google Maps already loaded, initializing autocomplete");
      setTimeout(initializeAutocomplete, 100);
    }

    return () => {
      if (autocompleteInstance.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteInstance.current
        );
      }
    };
  }, [open, initializeAutocomplete]);
  const onSubmit = async (data: FormValues) => {
    setServerError(null);

    // If no coordinates but location is provided, allow submission with default coordinates
    let lat = coordinates?.lat;
    let lng = coordinates?.lng;

    if (!coordinates && data.location.trim()) {
      console.log("No coordinates selected, using default location");
      // You can set default coordinates or make them optional
      lat = 0;
      lng = 0;
    } else if (!coordinates) {
      setServerError("Please enter a location.");
      return;
    }

    const payload = {
      firstName: data.fname.trim(),
      lastName: data.lname.trim(),
      email: data.email.trim(),
      password: data.newPassword,
      location: data.location.trim(),
      lat: lat,
      lng: lng,
      clinicName: data.cName.trim(),
    };

    try {
      if (!token) throw new Error("Not authorized. Please login again.");
      const res = await fetch(`/api/admin/doctor/admin-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body?.message || "Failed to add doctor.");
      }

      reset();
      onClose();
      router.refresh(); // refresh the list/count
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Request failed.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white_primary shadow-md p-6 rounded-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-2xl">Add Doctor</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-1 rounded-md text-gray-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              First Name
            </label>
            <Input
              id="fname"
              // name="fname"
              placeholder="Enter First Name"
              {...register("fname", { required: "First Name is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.fname && (
              <p className="mt-1 text-red text-xs">{errors.fname.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Last Name
            </label>
            <Input
              id="lname"
              // name="lname"
              placeholder="Enter Last Name"
              {...register("lname", { required: "Last Name is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.lname && (
              <p className="mt-1 text-red text-xs">{errors.lname.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Email Address
            </label>
            <Input
              id="email"
              // name="email"
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.email && (
              <p className="mt-1 text-red text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Create Password
            </label>
            <Input
              id="newPassword"
              // name="newPassword"
              type="password"
              placeholder="Enter password"
              withIcon
              {...register("newPassword", { required: "Password is required" })}
              className="border-black_secondary/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.newPassword && (
              <p className="mt-1 text-red text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Location
            </label>
            <div className="space-y-2">
              <Input
                ref={(e) => {
                  locationRef(e);
                  autocompleteRef.current = e;
                }}
                id="location"
                placeholder="Enter clinic location"
                {...locationRegister}
                className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
              />
              {!window.google?.maps?.places && (
                <button
                  type="button"
                  onClick={async () => {
                    const location = (
                      document.getElementById("location") as HTMLInputElement
                    )?.value;
                    if (location.trim()) {
                      // Fallback: use a simple geocoding approach or set default coordinates
                      setCoordinates({ lat: 0, lng: 0 });
                      console.log("Using fallback coordinates for:", location);
                    }
                  }}
                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                >
                  Use this location (if autocomplete not working)
                </button>
              )}
            </div>
            {errors.location && (
              <p className="mt-1 text-red text-xs">{errors.location.message}</p>
            )}
            {coordinates && (
              <p className="mt-1 text-green-600 text-xs">
                ✓ Location selected (Lat: {coordinates.lat.toFixed(6)}, Lng:{" "}
                {coordinates.lng.toFixed(6)})
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Clinic Name
            </label>
            <Input
              id="cName"
              placeholder="Enter Clinic Name"
              {...register("cName", { required: "Clinic Name is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.cName && (
              <p className="mt-1 text-red text-xs">{errors.cName.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red text-sm" role="alert">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-black_secondary hover:bg-black_tertiary mt-4 rounded-md w-full text-primary cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
