"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is [APP NAME]?",
    answer:
      "[APP NAME] is your ultimate study companion, designed to help you manage your schedules, access curated study materials, and stay motivated with features like quizzes, peer prompts, and AI-powered recommendations.",
  },
  {
    question: "How do I create a study schedule?",
    answer:
      "You can create a study schedule by navigating to the Schedule section, selecting your subjects, and using our AI-powered scheduler to automatically organize your study sessions based on your preferences and goals.",
  },
  {
    question: "Are the practice quizzes free?",
    answer:
      "Yes, all practice quizzes are completely free for all users. You can access unlimited quizzes across all subjects to test your knowledge and track your progress.",
  },
  {
    question: "How does the Peer Snitch/Prompts feature work?",
    answer:
      "The Peer Snitch/Prompts feature allows you to connect with up to four study partners. You can share study materials, get prompts from peers, and collaborate on learning together.",
  },
]

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  return (
    <section
      id="faqs"
      className="mx-auto max-w-7xl rounded-[2rem] bg-pink-100 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16 sm:py-20 mb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Side */}
        <div className="flex flex-col justify-between text-center md:text-left">
          <div>
            <p className="text-sm md:text-base font-semibold text-[#BC1823] uppercase tracking-wide">
              ANSWERS TO
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
              Frequently Asked <br className="hidden sm:block" />
              Questions
            </h2>
            <p className="mt-6 text-gray-700 text-base sm:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
              Get all your questions answered with ease. Explore everything you need to know about using{" "}
              <span className="font-semibold">[APP NAME]</span>!
            </p>
          </div>

          <button className="mt-10 mx-auto md:mx-0 inline-flex w-fit items-center gap-3 rounded-full bg-[#BC1823] px-8 py-4 text-base md:text-lg font-semibold text-white shadow-md transition-transform hover:scale-105">
            Contact Us
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Side - FAQ Accordion */}
        <div className="space-y-6 w-full">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-md w-full"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="flex w-full items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 rounded-2xl"
              >
                {item.question}
                <span
                  className={`text-2xl sm:text-3xl text-[#1A1A1A] transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {expandedIndex === index && (
                <div className="border-t border-gray-200 px-6 sm:px-8 py-5 sm:py-6 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
