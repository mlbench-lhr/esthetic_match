import React from 'react';
import FAQItem from './FAQItem';
import Image from 'next/image';

interface FAQData {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqData: FAQData[] = [
    {
      question: "Are the practitioners verified?",
      answer: "Yes"
    },
    {
      question: "Can I track my progress?",
      answer: "Yes"
    },
    {
      question: "Is the app free to use?",
      answer: "Yes"
    },
    {
      question: "What types of concerns can I get treated?",
      answer: "Yes"
    },
    {
      question: "Can I reschedule or cancel a booking?",
      answer: "Yes"
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes"
    },
    {
      question: "How do I know which treatment is right for me?",
      answer: "Yes"
    },
  ];

  return (
    <div id='faqs' className="max-w-[1280px] mx-auto px-4 lg:py-32 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="text-grey_secondary p3 font-base tracking-wide uppercase">
            FAQ
          </div>
          
          <h1 className="h1 font-light text-gray-900 leading-tight">
            Concerns We Cover at Esthetic Match
          </h1>
          
          <div className="space-y-2">
            <p className="text-black_primary font-light p2">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <button className="p3 text-black_secondary font-bold flex items-center gap-2">
              CONTACT US HERE
              <Image
                src="/images/FAQS/diagonal_arrow.svg"
                alt='arrow'
                width={12}
                height={12}
              />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* FAQ Items */}
          <div className="space-y-0  border-gray-200">
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;