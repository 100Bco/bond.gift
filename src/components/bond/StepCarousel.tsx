import { processSteps } from '@/data/content';
import { Carousel } from './Carousel';
import { Media } from './Media';

/* Các bước quy trình dạng card đều nhau trong Carousel. */
export function StepCarousel({ steps = processSteps }: { steps?: typeof processSteps }) {
  return (
    <Carousel label="Các bước quy trình" perView={4} className="step-carousel">
      {steps.map((step) => (
        <article key={step.number} className="step-card">
          <span className="step-card-no t-numeral">{step.number}</span>
          <Media ratio="16 / 10" tone="paper" motion={step.motion} art="magenta" play="hover" alt="" className="step-card-media" />
          <div className="step-card-body">
            <h3 className="t-h4">{step.title}</h3>
            <p className="step-card-duration">{step.duration}</p>
            <p className="step-card-copy">{step.copy}</p>
          </div>
        </article>
      ))}
    </Carousel>
  );
}
