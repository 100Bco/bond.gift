import { SiteShell } from '@/components/layout/SiteChrome';
import { Bespoke, ReadySets } from '@/components/bond/Collections';
import { useState, type CSSProperties } from 'react';
import { Link } from 'wouter';
import { StepList } from '@/components/bond/ProcessSteps';
import { ZaloLink } from '@/components/bond/ZaloLink';
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

/** /set-doc-ban: lưới 2×2 các mức ngân sách Độc Bản. */
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

/** /quy-trinh: hai quy trình đặt cạnh nhau (máy tính), điện thoại chuyển bằng hai tab. */
export function ProcessPage() {
  const [tab, setTab] = useState<'ready' | 'bespoke'>('ready');
  const cols = [
    { kind: 'ready' as const, name: 'Sẵn Trao', time: '1-2 tuần' },
    { kind: 'bespoke' as const, name: 'Độc Bản', time: '8 tuần' },
  ];
  return (
    <SiteShell>
      <div className="lx lx-sd lx-page">
        <section className="lx-sec lx-proc" aria-labelledby="lx-proc-title">
          <div className="lx-wrap">
            <div className="lx-proc-head">
              <p className="lx-eyebrow">Quy trình</p>
              <h1 id="lx-proc-title">Hai cách đặt quà, hai quy trình rõ ràng.</h1>
            </div>
            <div className="lx-proc-tabs" role="tablist" aria-label="Chọn quy trình">
              {cols.map((c) => (
                <button key={c.kind} type="button" role="tab" id={`tab-${c.kind}`} aria-controls={`proc-${c.kind}`} aria-selected={tab === c.kind} className={tab === c.kind ? 'is-on' : undefined} onClick={() => { setTab(c.kind); requestAnimationFrame(() => window.dispatchEvent(new Event('scroll'))); }}>{c.name}</button>
              ))}
            </div>
            {/* Máy tính: hai cột dùng chung hàng (subgrid) để bước 1 thẳng bước 1, bước 2 thẳng bước 2 */}
            <div className="lx-proc-cols" style={{ '--rows': Math.max(...cols.map((c) => giftProcesses[c.kind].steps.length)) } as CSSProperties}>
              {cols.map((c) => (
                <div key={c.kind} id={`proc-${c.kind}`} role="tabpanel" aria-labelledby={`tab-${c.kind}`} className={`lx-proc-col${tab === c.kind ? ' is-on' : ''}`} style={{ '--n': giftProcesses[c.kind].steps.length } as CSSProperties}>
                  <h2 className="lx-proc-name">{c.name}</h2>
                  <p className="lx-proc-meta">{c.time}</p>
                  <StepList kind={c.kind} />
                  <div className="lx-proc-cta">
                    {c.kind === 'ready'
                      ? <Link href="/set-san" className="lx-btn lx-btn-line">Xem Sẵn Trao</Link>
                      : <ZaloLink className="lx-btn lx-btn-red">Nhận tư vấn thiết kế</ZaloLink>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <TetCta />
      </div>
    </SiteShell>
  );
}
