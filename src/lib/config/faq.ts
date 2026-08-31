export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "events",
    question: "What kinds of events do you cater?",
    answer:
      "Weddings, corporate events, campus events, birthdays, graduations, private celebrations — and pretty much anything in between. If you're gathering people, we can bring the drinks.",
  },
  {
    id: "cost",
    question: "How do I know how much my event will cost?",
    answer:
      "Our pricing is simple, so you don't have to wait for a custom quote. Drop-Off Catering is $5 per drink, and Full Booth Service is $5 per drink plus a $300 service fee. Use our event planner to customize your order and see your price instantly before you book.",
  },
  {
    id: "dropoff-includes",
    question: "What's included with Drop-Off Catering?",
    answer:
      "Freshly prepared drinks with a topping included, free delivery, free drop-off, and optional free table setup if you'd like it.",
  },
  {
    id: "booth-includes",
    question: "What's included with Full Booth Service?",
    answer:
      "On-site booth setup, a staff/server, drinks prepared fresh during the event, toppings, service throughout, and cleanup.",
  },
  {
    id: "toppings",
    question: "Are toppings included?",
    answer:
      "Yes. Homemade Boba or Lychee Jelly can be included with your drink at no additional charge.",
  },
  {
    id: "customize",
    question: "Can I customize my drink selection?",
    answer:
      "Absolutely. For Drop-Off you can pick exact drinks and quantities, or let Sunset Tea recommend a crowd-friendly mix. For Full Booth, choose which drinks you'd like available at the booth.",
  },
  {
    id: "unsure",
    question: "What if I don't know which drinks to choose?",
    answer:
      "No stress. Our crowd favorites are Classic Black Milk Tea with Homemade Boba, Mango Milk Tea with Homemade Boba, and Strawberry Mango Fruit Tea with Lychee Jelly. You can also select “Let Sunset Tea choose for me” and we'll confirm a mix with you before the event.",
  },
  {
    id: "popular",
    question: "What are your most popular drinks?",
    answer:
      "Classic Black Milk Tea + Homemade Boba, Mango Milk Tea + Homemade Boba, and Strawberry Mango Fruit Tea + Lychee Jelly.",
  },
  {
    id: "special",
    question: "Can you accommodate special requests?",
    answer:
      "We try to stay flexible. Tell us what you have in mind when you plan your event and we'll let you know what we can do.",
  },
  {
    id: "payment",
    question: "Do I have to pay when I book?",
    answer:
      "No payment is required when you submit your event request. We'll receive your event details, follow up within 24 hours, and confirm everything with you.",
  },
  {
    id: "response",
    question: "How quickly will you respond?",
    answer: "As soon as possible — and always within 24 hours.",
  },
  {
    id: "advance",
    question: "How far in advance should I plan?",
    answer:
      "Earlier is better for date availability, but you're always welcome to reach out on shorter notice. We'll confirm what we can make work.",
  },
  {
    id: "booked",
    question: "Is my event booked when I submit?",
    answer:
      "Submitting your event request lets us know you're ready to move forward. You'll already know your price, and we'll reach out within 24 hours to confirm the event details with you.",
  },
];
