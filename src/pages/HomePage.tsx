import { useEffect, useRef, useState } from 'react';
import { bespokeBudgets, clientLogos, giftModels, giftProcesses, readySets } from '@/data/content';
import { SiteShell } from '@/components/layout/SiteChrome';
import { Reveal } from '@/components/bond/Reveal';
import { ZaloLink } from '@/components/bond/ZaloLink';
import { Arm, GiftBox, ModelArt, MomentArt, SetArt } from '@/components/bond/GiftArt';
import { usePrefersReducedMotion } from '@/hooks/use-in-view';

/* Trang chủ editorial: hero hai pha, hai mô hình quà, set sẵn, set độc bản, khoảnh khắc Tết, quy trình. */

const TET = new Date('2027-02-06T00:00:00+07:00');
const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');
const ArrowUp = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 12L12 4M12 4H5.5M12 4v6.5" /></svg>;
const ArrowDown = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 3v10M8 13l-4.5-4.5M8 13l4.5-4.5" /></svg>;

function useTetCountdown() {
  const calc = () => {
    const now = new Date();
    if (now >= TET) return null;
    let months = (TET.getFullYear() - now.getFullYear()) * 12 + (TET.getMonth() - now.getMonth());
    let anchor = new Date(now.getTime());
    anchor.setMonth(anchor.getMonth() + months);
    if (anchor > TET) { months -= 1; anchor = new Date(now.getTime()); anchor.setMonth(anchor.getMonth() + months); }
    const diff = TET.getTime() - anchor.getTime();
    return { m: months, d: Math.floor(diff / 86_400_000), h: Math.floor(diff / 3_600_000) % 24, min: Math.floor(diff / 60_000) % 60 };
  };
  const [value, setValue] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setValue(calc()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return value;
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const norm = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const cd = useTetCountdown();
  const [phase2, setPhase2] = useState(false);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduced || window.innerWidth <= 860) return;
      const total = hero.offsetHeight - window.innerHeight;
      const progress = clamp((window.scrollY - hero.offsetTop) / (total || 1));
      const pArmL = easeOut(norm(progress, 0.3, 0.7));
      const pArmR = easeOut(norm(progress, 0.28, 0.68));
      const pOut = easeOut(norm(progress, 0.38, 0.6));
      const pIn = easeOut(norm(progress, 0.68, 0.92));
      const set = (k: string, v: string) => hero.style.setProperty(k, v);
      set('--armLY', lerp(115, 0, pArmL).toFixed(2));
      set('--armRY', lerp(115, 0, pArmR).toFixed(2));
      set('--p1op', (1 - pOut).toFixed(3));
      set('--p1y', `${lerp(0, -50, pOut).toFixed(1)}px`);
      set('--boxY', `${lerp(0, -64, pArmL).toFixed(1)}px`);
      set('--midLift', `${lerp(0, -36, pArmL).toFixed(1)}px`);
      set('--midScale', lerp(1, 1.12, pArmL).toFixed(3));
      set('--sideOp', lerp(1, 0.2, pArmL).toFixed(3));
      set('--sideScale', lerp(1, 0.92, pArmL).toFixed(3));
      set('--sideDrop', `${lerp(0, 18, pArmL).toFixed(1)}px`);
      set('--sideBlur', `${lerp(0, 3, pArmL).toFixed(2)}px`);
      set('--p2op', pIn.toFixed(3));
      set('--p2y', `${lerp(30, 0, pIn).toFixed(1)}px`);
      set('--hintOp', (1 - easeOut(norm(progress, 0.02, 0.15))).toFixed(3));
      setPhase2(pIn > 0.5);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, [reduced]);

  return (
    <section ref={ref} className={`lx-hero ${reduced ? 'is-static' : ''}`} aria-labelledby="lx-hero-title">
      <div className="lx-hero-sticky">
        <div className="lx-hero-in">
          <div className="lx-hero-p1" style={{ pointerEvents: phase2 ? 'none' : undefined }}>
            <p className="lx-eyebrow">Quà Tết Doanh Nghiệp · Đinh Mùi 2027</p>
            <h1 id="lx-hero-title" className="lx-hero-title">Relationships, <em className="lx-serif">compounded.</em></h1>
            <p className="lx-hero-sub">Mối quan hệ, được nhân lên theo thời gian.</p>
            {cd && (
              <div className="lx-cd" role="timer" aria-label={`Còn ${cd.m} tháng ${cd.d} ngày đến Tết Đinh Mùi 2027`}>
                {([[cd.m, 'Tháng'], [cd.d, 'Ngày'], [cd.h, 'Giờ'], [cd.min, 'Phút']] as [number, string][]).map(([v, label], i) => (
                  <div key={label} className="lx-cd-group" aria-hidden="true">
                    {i > 0 && <span className="lx-cd-sep" />}
                    <span className="lx-cd-unit"><span className="lx-cd-num">{pad(v)}</span><span className="lx-cd-lab">{label}</span></span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lx-hero-boxes" role="img" aria-label="Minh họa năm hộp quà BOND, hộp đỏ ở giữa">
            <div className="lx-gbox lx-gbox-side lx-gbox-n1"><GiftBox tone="ivory" /></div>
            <div className="lx-gbox lx-gbox-side lx-gbox-n2"><GiftBox tone="obsidian" /></div>
            <div className="lx-gbox lx-gbox-mid"><GiftBox tone="crimson" big /></div>
            <div className="lx-gbox lx-gbox-side lx-gbox-n4"><GiftBox tone="black" /></div>
            <div className="lx-gbox lx-gbox-side lx-gbox-n5"><GiftBox tone="raw" /></div>
          </div>

          <div className="lx-hero-arms" aria-hidden="true">
            <div className="lx-arm lx-arm-l"><Arm side="l" /></div>
            <div className="lx-arm lx-arm-r"><Arm side="r" /></div>
          </div>

          <div className={`lx-hero-p2 ${phase2 ? 'is-live' : ''}`}>
            <p className="lx-hero-line2">Brands, <span className="lx-serif">in hand.</span></p>
            <p className="lx-hero-line2sub">Đưa dấu ấn thương hiệu vào từng món quà trao tay.</p>
            <a href="#set-san" className="lx-btn lx-btn-red" tabIndex={phase2 ? undefined : -1}><span>Khám phá bộ sưu tập</span><ArrowDown /></a>
          </div>

          <div className="lx-hero-hint" aria-hidden="true">Cuộn để khám phá</div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const reduced = usePrefersReducedMotion();
  const row = reduced ? clientLogos : [...clientLogos, ...clientLogos];
  return (
    <section className="lx-logos" aria-label="Khách hàng đã đồng hành">
      <div className="lx-logos-in">
        <p className="lx-logos-lab">Đã đồng hành cùng hệ sinh thái 100B</p>
        <div className="lx-logos-track">
          <ul className={`lx-logos-row ${reduced ? 'is-static' : ''}`}>
            {row.map((c, i) => (
              <li key={`${c.name}-${i}`} aria-hidden={i >= clientLogos.length ? true : undefined}>
                <img src={c.logo} alt={i >= clientLogos.length ? '' : c.name} loading="lazy" height={36} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="lx-logos-note">Bao gồm dự án nhận diện thương hiệu bởi ZAD và sản xuất quà tặng độc bản bởi BOND.</p>
    </section>
  );
}

function Models() {
  return (
    <section className="lx-sec lx-cmp" id="hai-mo-hinh" aria-labelledby="lx-cmp-title">
      <div className="lx-wrap">
        <Reveal className="lx-cmp-head">
          <p className="lx-eyebrow">Hai phương thức tiếp cận</p>
          <h2 id="lx-cmp-title">Hai cách để BOND làm quà<br />cho thương hiệu của bạn</h2>
          <p className="lx-lead">Cùng một đội ngũ giám tuyển, cùng chuẩn mực gia công cao nhất. Khác biệt nằm ở mức độ khắc họa bản sắc thương hiệu riêng biệt.</p>
        </Reveal>
        <Reveal className="lx-cmp-grid">
          {(['ready', 'bespoke'] as const).map((kind, i) => {
            const m = giftModels[kind];
            return (
              <div key={kind} className={`lx-cmp-col lx-cmp-col-${kind}`}>
                {kind === 'bespoke' && <span className="lx-cross lx-cmp-cross" aria-hidden="true" />}
                <span className="lx-cmp-badge">Mô hình {pad(i + 1)}</span>
                <h3 className="lx-cmp-name">{m.name}</h3>
                <p className="lx-cmp-say">{m.say}</p>
                <div className="lx-cmp-preview"><ModelArt kind={kind} /></div>
                <dl className="lx-cmp-specs">
                  {m.specs.map(([k, v]) => <div key={k} className="lx-cmp-row"><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
                <a href={kind === 'ready' ? '#set-san' : '#set-doc-ban'} className={`lx-btn ${kind === 'ready' ? 'lx-btn-line' : 'lx-btn-red'}`}>
                  {kind === 'ready' ? 'Xem catalogue Set Sẵn' : 'Khám phá giải pháp Độc Bản'}
                </a>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function ReadySets() {
  return (
    <section className="lx-sec lx-ready" id="set-san" aria-labelledby="lx-ready-title">
      <div className="lx-wrap">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">01 · Catalogue tuyển chọn</p>
            <h2 id="lx-ready-title">Set Sẵn Cao Cấp</h2>
          </div>
          <p className="lx-lead">Giao nhanh, đồng bộ nhận diện, ứng dụng kỹ thuật dập ép kim logo thương hiệu tinh xảo.</p>
        </Reveal>
        <div className="lx-cards">
          {readySets.map((set, i) => (
            <Reveal key={set.name} delay={(i % 2) as 0 | 1}>
              <ZaloLink className="lx-card">
                <div className="lx-card-img">
                  <span className="lx-card-tag">{set.tier}</span>
                  <SetArt look={set.look} />
                </div>
                <h3 className="lx-card-name">{set.name}</h3>
                <p className="lx-card-price">{set.price}</p>
                <p className="lx-card-in">{set.contents}</p>
                <span className="lx-card-more">Chi tiết cấu phần <span aria-hidden="true">→</span></span>
              </ZaloLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bespoke() {
  return (
    <section className="lx-sec lx-custom" id="set-doc-ban" aria-labelledby="lx-custom-title">
      <div className="lx-wrap">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">02 · Thiết kế riêng biệt</p>
            <h2 id="lx-custom-title">Set Quà Độc Bản</h2>
            <div className="lx-disc">
              <span className="lx-cross" aria-hidden="true" />
              <p>Mỗi đề xuất dưới đây là một điểm xuất phát ý niệm sáng tạo. BOND cùng đội ngũ ZAD sẽ phát triển cấu trúc bao bì và trải nghiệm unboxing độc quyền cho riêng thương hiệu của bạn.</p>
            </div>
          </div>
          <p className="lx-lead">Lựa chọn khung ngân sách mục tiêu để tiếp cận bộ sưu tập ý niệm tương ứng.</p>
        </Reveal>
        <Reveal className="lx-bud">
          {bespokeBudgets.map((b, i) => (
            <ZaloLink key={b.money} className="lx-bud-row">
              <span className="lx-bud-no">{pad(i + 1)}</span>
              <span className="lx-bud-money">{b.money} <small>ngân sách / set</small></span>
              <span className="lx-bud-meta">{b.meta}</span>
              <span className="lx-bud-go">Xem concept <span aria-hidden="true">→</span></span>
            </ZaloLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Moment() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const shift = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        node.style.transform = `translateY(${((shift - 0.5) * -30).toFixed(1)}px)`;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [reduced]);
  return (
    <section className="lx-moment" id="khoanh-khac" aria-labelledby="lx-moment-title">
      <div className="lx-wrap lx-moment-grid">
        <div className="lx-moment-img"><div ref={ref} className="lx-moment-art"><MomentArt /></div></div>
        <Reveal className="lx-moment-txt">
          <p className="lx-eyebrow">Triết lý tặng quà</p>
          <h2 id="lx-moment-title">Món quà Tết không được nhớ vì giá.<br />Nó được nhớ vì người nhận<br /><em className="lx-serif">cảm thấy mình trân quý.</em></h2>
          <p>Đó là lý do BOND bắt đầu từ việc thấu cảm chân dung người nhận: địa vị, phong vị sống và gu thẩm mỹ. Sau đó mới tạo hình nên chất liệu, chi tiết mở hộp và tuyển chọn từng thức quà bên trong.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const [open, setOpen] = useState<string | null>(giftProcesses[1].id);
  return (
    <section className="lx-sec lx-proc" id="quy-trinh" aria-labelledby="lx-proc-title">
      <div className="lx-wrap">
        <Reveal className="lx-sec-head">
          <div>
            <p className="lx-eyebrow">Tiến trình chuyên nghiệp</p>
            <h2 id="lx-proc-title">Từ ý niệm đến tay người nhận</h2>
          </div>
          <p className="lx-lead">Hai quy trình kiểm soát chất lượng nghiêm ngặt, đảm bảo tiến độ chính xác tuyệt đối mùa cao điểm.</p>
        </Reveal>
        <Reveal className="lx-acc">
          {giftProcesses.map((proc) => {
            const isOpen = open === proc.id;
            return (
              <div key={proc.id} className="lx-acc-item">
                <h3 className="lx-acc-h">
                  <button type="button" className="lx-acc-btn" aria-expanded={isOpen} aria-controls={proc.id} onClick={() => setOpen(isOpen ? null : proc.id)}>
                    <span className="lx-acc-ttl">{proc.title}</span>
                    <span className="lx-acc-meta">{proc.meta}</span>
                    <span className="lx-acc-ico" aria-hidden="true" />
                  </button>
                </h3>
                <div className="lx-acc-body" id={proc.id} role="region" aria-label={proc.title}>
                  <div className="lx-acc-inner" inert={!isOpen || undefined}>
                    <ol className="lx-steps">
                      {proc.steps.map(([t, d], i) => (
                        <li key={t} className="lx-step"><span className="lx-step-n">{pad(i + 1)}</span><div><p className="lx-step-t">{t}</p><p className="lx-step-d">{d}</p></div></li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="lx-cta" aria-labelledby="lx-cta-title">
      <div className="lx-wrap">
        <Reveal><h2 id="lx-cta-title">Bắt đầu từ bây giờ<br />là thời điểm hoàn hảo nhất.</h2></Reveal>
        <Reveal delay={1}><p>Tết Đinh Mùi sẽ diễn ra vào tháng 2/2027. Các dự án set quà thiết kế độc bản cần khoảng 8 tuần cho việc nghiên cứu mẫu và sản xuất đạt độ tinh xảo cao nhất.</p></Reveal>
        <Reveal delay={2}><ZaloLink className="lx-btn lx-btn-white"><span>Khởi tạo cuộc trò chuyện</span><ArrowUp /></ZaloLink></Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <SiteShell>
      <div className="lx">
        <Hero />
        <LogoStrip />
        <Models />
        <ReadySets />
        <Bespoke />
        <Moment />
        <Process />
        <Cta />
      </div>
    </SiteShell>
  );
}
