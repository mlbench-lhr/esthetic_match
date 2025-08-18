import React from 'react'
import DownloadButton from '../hero/DownloadButton'
import Image from 'next/image'

function Left() {
    return (
        <div className='max-w-[530px]'>
            <div>
                <div className="h1 text-black-secondary">
                    <h1 className="font-bold">Tell us what you need</h1>
                    <p className="font-light">We’ll find the expert who gets it</p>
                </div>
                <p className='p2 text-black_tertiary mb-5'>Esthetic Match goes beyond traditional search. Our intelligent filters let patients easily input their aesthetic concerns and specific needs. The algorithm then matches them with relevant procedures — both non-invasive and surgical and show associated practitioners. Patients can explore practitioners, check before/afters photos, save favorites, request online medical opinions, and book appointments when ready.</p>
                <DownloadButton text={"DOWNLOAD THE APP"} className='py-4 rounded-xl'/>
            </div>
            <div className='flex flex-col mt-10 gap-5'>
                <div>
                    <div>
                        <Image
                            src="/images/need/patient.webp"
                            width={30}
                            height={30}
                            alt="Patient"
                        />
                    </div>
                    <h3 className='h3 text-black_secondary'>For Patient</h3>
                    <p>Get matched with the right aesthetic expert for your unique concerns</p>
                    <p>Compare, explore before/afters, estimate prices, and request online opinions — all in one place.</p>
                </div>
                <div>
                    <div>
                        <Image
                            src="/images/need/practitioner.webp"
                            width={30}
                            height={30}
                            alt="practitioner"
                        />
                    </div>
                    <h3 className='h3 text-black_secondary'>For Practitioners</h3>
                    <p>Showcase your signature techniques and stand out for what you do best. </p>
                    <p>Connecting you to patients who are actively seeking exactly what you offer</p>
                </div>
            </div>
        </div>
    )
}

export default Left