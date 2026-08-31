import { FAQ_ITEMS } from "@/lib/config/faq";
import { RESPONSE_TIME_HOURS } from "@/lib/config/business";
import { Accordion } from "@/components/ui/Accordion";
import { Container, Eyebrow, Section } from "@/components/ui/Container";

export function FAQAccordion() {
  return (
    <Section id="faq" alt className="!pt-10 sm:!pt-12 lg:!pt-14">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display-lg mt-3">Frequently asked</h2>
          <p className="lead mx-auto mt-4">
            Quick answers about catering, pricing, and how easy it is to work with Sunset Tea.
            We respond within {RESPONSE_TIME_HOURS} hours.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion
            items={FAQ_ITEMS.map((item) => ({
              id: item.id,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
