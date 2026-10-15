import { SiteShell } from '@/components/layout/SiteChrome';
import { Bespoke, ReadySets } from '@/components/bond/Collections';
import { ProcessSteps } from '@/components/bond/ProcessSteps';
import { TetCta } from '@/components/bond/TetCta';
import { giftProcesses } from '@/data/content';

/** /set-san: lưới 4 set sẵn. */
export function ReadySetsPage() {
  return (
    <SiteShell>
      <div className="lx lx-page">
        <ReadySets />
        <TetCta />
      </div>
    </SiteShell>
  );
}

/** /set-doc-ban: lưới 2×2 các mức ngân sách Set độc bản. */
export function BespokeListPage() {
  return (
    <SiteShell>
      <div className="lx lx-page">
        <Bespoke />
        <TetCta />
      </div>
    </SiteShell>
  );
}

/** /quy-trinh: hai quy trình đặt quà, mỗi quy trình một khối có đường đỏ chạy theo cuộn. */
export function ProcessPage() {
  return (
    <SiteShell>
      <div className="lx lx-sd lx-page">
        <section className="lx-sec lx-proc-hero" aria-labelledby="lx-proc-title">
          <div className="lx-wrap">
            <p className="lx-eyebrow">Quy trình</p>
            <h1 id="lx-proc-title">Hai cách đặt quà,<br />hai quy trình rõ ràng.</h1>
            <p className="lx-sec-meta"><span>Set sẵn {giftProcesses.ready.steps.length} bước, khoảng 2 tuần</span><i aria-hidden="true">·</i><span>Set độc bản {giftProcesses.bespoke.steps.length} bước, khoảng 8 tuần</span></p>
          </div>
        </section>
        <ProcessSteps kind="ready" id="set-san" eyebrow="Set sẵn · khoảng 2 tuần" />
        <ProcessSteps kind="bespoke" id="set-doc-ban" eyebrow="Set độc bản · khoảng 8 tuần" />
        <TetCta />
      </div>
    </SiteShell>
  );
}
