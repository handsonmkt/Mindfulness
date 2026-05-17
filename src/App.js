import { useState, useRef } from "react";

const questions = [
  { id: 1,  text: "Quando estou caminhando, eu deliberadamente percebo as sensações do meu corpo em movimento.", factor: "observar", reverse: false },
  { id: 2,  text: "Sou bom para encontrar palavras que descrevam os meus sentimentos.", factor: "descrever", reverse: false },
  { id: 3,  text: "Eu me critico por ter emoções irracionais ou inapropriadas.", factor: "nao_julgar", reverse: true },
  { id: 4,  text: "Eu percebo meus sentimentos e emoções sem ter que reagir a eles.", factor: "nao_reagir", reverse: false },
  { id: 5,  text: "Quando faço algo, minha mente voa e me distraio facilmente.", factor: "agir_consciencia", reverse: true },
  { id: 6,  text: "Quando eu tomo banho, eu fico alerta às sensações da água no meu corpo.", factor: "observar", reverse: false },
  { id: 7,  text: "Eu consigo facilmente descrever minhas crenças, opiniões e expectativas em palavras.", factor: "descrever", reverse: false },
  { id: 8,  text: "Eu não presto atenção no que faço porque fico sonhando acordado, preocupado com outras coisas ou distraído.", factor: "agir_consciencia", reverse: true },
  { id: 9,  text: "Eu observo meus sentimentos sem me perder neles.", factor: "nao_reagir", reverse: false },
  { id: 10, text: "Eu digo a mim mesmo que eu não deveria me sentir da forma como estou me sentindo.", factor: "nao_julgar", reverse: true },
  { id: 11, text: "Eu percebo como a comida e a bebida afetam meus pensamentos, sensações corporais e emoções.", factor: "observar", reverse: false },
  { id: 12, text: "É difícil para mim encontrar palavras para descrever o que estou pensando.", factor: "descrever", reverse: true },
  { id: 13, text: "Eu me distraio facilmente.", factor: "agir_consciencia", reverse: true },
  { id: 14, text: "Eu acredito que alguns dos meus pensamentos são maus ou anormais e eu não deveria pensar daquela forma.", factor: "nao_julgar", reverse: true },
  { id: 15, text: "Eu presto atenção em sensações, tais como o vento em meus cabelos ou o sol no meu rosto.", factor: "observar", reverse: false },
  { id: 16, text: "Eu tenho problemas para encontrar as palavras certas para expressar como me sinto sobre as coisas.", factor: "descrever", reverse: true },
  { id: 17, text: "Eu faço julgamentos sobre se meus pensamentos são bons ou maus.", factor: "nao_julgar", reverse: true },
  { id: 18, text: "Eu acho difícil permanecer focado no que está acontecendo no momento presente.", factor: "agir_consciencia", reverse: true },
  { id: 19, text: "Geralmente, quando tenho imagens ou pensamentos ruins, eu 'dou um passo atrás' e tomo consciência do pensamento ou imagem sem ser levado por eles.", factor: "nao_reagir", reverse: false },
  { id: 20, text: "Eu presto atenção aos sons, tais como o tic tac do relógio, o canto dos pássaros ou dos carros passando.", factor: "observar", reverse: false },
  { id: 21, text: "Em situações difíceis, eu consigo fazer uma pausa, sem reagir imediatamente.", factor: "nao_reagir", reverse: false },
  { id: 22, text: "Quando tenho uma sensação no meu corpo, é difícil para mim descrevê-la porque não consigo encontrar as palavras certas.", factor: "descrever", reverse: true },
  { id: 23, text: "Parece que eu estou 'funcionando no piloto automático' sem muita consciência do que estou fazendo.", factor: "agir_consciencia", reverse: true },
  { id: 24, text: "Geralmente, quando tenho imagens ou pensamentos ruins, eu me sinto calmo logo depois.", factor: "nao_reagir", reverse: false },
  { id: 25, text: "Eu digo a mim mesmo que eu não deveria pensar da forma como estou pensando.", factor: "nao_julgar", reverse: true },
  { id: 26, text: "Eu percebo o cheiro e o aroma das coisas.", factor: "observar", reverse: false },
  { id: 27, text: "Mesmo quando me sinto terrivelmente aborrecido, consigo encontrar uma maneira de me expressar em palavras.", factor: "descrever", reverse: false },
  { id: 28, text: "Eu realizo atividades apressadamente sem estar realmente atento a elas.", factor: "agir_consciencia", reverse: true },
  { id: 29, text: "Geralmente, quando eu tenho imagens ou pensamentos aflitivos, eu sou capaz de apenas notá-los, sem reagir a eles.", factor: "nao_reagir", reverse: false },
  { id: 30, text: "Eu acho que algumas das minhas emoções são más ou inapropriadas e eu não deveria senti-las.", factor: "nao_julgar", reverse: true },
  { id: 31, text: "Eu percebo elementos visuais na arte ou na natureza tais como: cores, formatos, texturas ou padrões de luz e sombra.", factor: "observar", reverse: false },
  { id: 32, text: "Minha tendência natural é colocar minhas experiências em palavras.", factor: "descrever", reverse: false },
  { id: 33, text: "Geralmente, quando eu tenho imagens ou pensamentos ruins, eu apenas os percebo e os deixo ir.", factor: "nao_reagir", reverse: false },
  { id: 34, text: "Eu realizo tarefas automaticamente, sem prestar atenção no que estou fazendo.", factor: "agir_consciencia", reverse: true },
  { id: 35, text: "Normalmente quando tenho pensamentos ruins ou imagens estressantes, eu me julgo como bom ou mau, dependendo do tipo de imagens ou pensamentos.", factor: "nao_julgar", reverse: true },
  { id: 36, text: "Eu presto atenção em como minhas emoções afetam meus pensamentos e comportamento.", factor: "observar", reverse: false },
  { id: 37, text: "Normalmente eu consigo descrever detalhadamente como me sinto no momento presente.", factor: "descrever", reverse: false },
  { id: 38, text: "Eu me pego fazendo coisas sem prestar atenção a elas.", factor: "agir_consciencia", reverse: true },
  { id: 39, text: "Eu me reprovo quando tenho ideias irracionais.", factor: "nao_julgar", reverse: true },
];

const factors = {
  observar:         { label: "Observar",              color: "#2DD4BF", icon: "👁",  max: 40, desc: "Capacidade metacognitiva de observar experiências internas como eventos objetivos e transitórios da mente." },
  descrever:        { label: "Descrever",              color: "#A78BFA", icon: "💬", max: 40, desc: "Capacidade de caracterizar e comunicar claramente experiências internas através de palavras." },
  agir_consciencia: { label: "Agir com\nConsciência",  color: "#F59E0B", icon: "🧠", max: 40, desc: "Estar intencionalmente presente e consciente do que está fazendo, ao invés do piloto automático." },
  nao_julgar:       { label: "Não\nJulgar",            color: "#F472B6", icon: "⚖️", max: 40, desc: "Habilidade de não adotar postura avaliativa em relação à experiência interna." },
  nao_reagir:       { label: "Não\nReagir",            color: "#34D399", icon: "🌊", max: 35, desc: "Capacidade de autorizar que a experiência aconteça sem ser tomado por ela." },
};

const factorKeys = Object.keys(factors);
const labels = ["Nunca ou raramente verdadeiro", "Às vezes verdadeiro", "Não tenho certeza", "Normalmente verdadeiro", "Quase sempre ou sempre verdadeiro"];

function reverseScore(v) { return 6 - v; }

function calcScores(answers) {
  const scores = { observar: 0, descrever: 0, agir_consciencia: 0, nao_julgar: 0, nao_reagir: 0 };
  questions.forEach(q => {
    const raw = answers[q.id];
    if (!raw) return;
    scores[q.factor] += q.reverse ? reverseScore(raw) : raw;
  });
  return scores;
}

function getLevel(pct) {
  if (pct >= 75) return { label: "Elevado",           color: "#34D399", bg: "rgba(52,211,153,0.12)" };
  if (pct >= 50) return { label: "Moderado",          color: "#F59E0B", bg: "rgba(245,158,11,0.12)" };
  return              { label: "Em desenvolvimento", color: "#F472B6", bg: "rgba(244,114,182,0.12)" };
}

function RadarChart({ scores }) {
  const size = 320, cx = 160, cy = 165, R = 108;
  const n = factorKeys.length;

  function polar(i, r) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPts = factorKeys.map((k, i) => polar(i, R * (scores[k] / factors[k].max)));
  const dataPath = dataPts.map(([x,y], i) => `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {rings.map(r => {
        const pts = factorKeys.map((_, i) => polar(i, R * r));
        const d = pts.map(([x,y],i) => `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";
        return <path key={r} d={d} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />;
      })}
      {factorKeys.map((_, i) => {
        const [x, y] = polar(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />;
      })}
      {rings.map(r => {
        const [x, y] = polar(0, R * r);
        return <text key={r} x={(x+4).toFixed(1)} y={(y-3).toFixed(1)} fill="rgba(255,255,255,0.28)" fontSize={7.5} fontFamily="Inter,sans-serif">{Math.round(r*100)}%</text>;
      })}
      <path d={dataPath} fill="rgba(45,212,191,0.18)" stroke="#2DD4BF" strokeWidth={2.5} strokeLinejoin="round" />
      {dataPts.map(([x, y], i) => (
        <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={5.5} fill={factors[factorKeys[i]].color} stroke="#0f172a" strokeWidth={2} />
      ))}
      {factorKeys.map((k, i) => {
        const f = factors[k];
        const [x, y] = polar(i, R + 30);
        const anchor = x < cx - 8 ? "end" : x > cx + 8 ? "start" : "middle";
        const lines = f.label.split("\n");
        return (
          <text key={k} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={anchor} fill={f.color} fontSize={10} fontWeight="700" fontFamily="Inter,sans-serif">
            {lines.map((l, li) => <tspan key={li} x={x.toFixed(1)} dy={li === 0 ? 0 : 13}>{l}</tspan>)}
          </text>
        );
      })}
    </svg>
  );
}

const ITEMS_PER_PAGE = 10;

export default function App() {
  const [step, setStep]             = useState("intro");
  const [answers, setAnswers]       = useState({});
  const [name, setName]             = useState("");
  const [page, setPage]             = useState(0);
  const [missingIds, setMissingIds] = useState([]);
  const [generating, setGenerating] = useState(false);
  const topRef       = useRef(null);
  const firstMissRef = useRef(null);

  const totalPages    = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const pageQuestions = questions.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const answered      = Object.keys(answers).length;
  const scores        = calcScores(answers);

  function scrollTop() { topRef.current?.scrollIntoView({ behavior: "smooth" }); }

  function nextPage() {
    const missing = pageQuestions.map(q => q.id).filter(id => !answers[id]);
    if (missing.length > 0) {
      setMissingIds(missing);
      setTimeout(() => firstMissRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      return;
    }
    setMissingIds([]);
    if (page < totalPages - 1) { setPage(p => p + 1); scrollTop(); }
    else { setStep("result"); scrollTop(); }
  }

  function prevPage() {
    setMissingIds([]);
    if (page > 0) { setPage(p => p - 1); scrollTop(); }
  }

  function handleAnswer(id, val) {
    setAnswers(a => ({ ...a, [id]: val }));
    setMissingIds(m => m.filter(x => x !== id));
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (step === "intro") return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f2b4a 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        *{box-sizing:border-box}
        .bp{background:linear-gradient(135deg,#2DD4BF,#3B82F6);color:white;border:none;padding:15px 38px;border-radius:50px;font-size:16px;font-family:'Inter',sans-serif;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 8px 32px rgba(45,212,191,.35)}
        .bp:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(45,212,191,.5)}
        .ni{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:13px 16px;font-size:15px;color:white;width:100%;font-family:'Inter',sans-serif;outline:none;transition:border .2s}
        .ni::placeholder{color:rgba(255,255,255,.38)}
        .ni:focus{border-color:#2DD4BF}
      `}</style>
      <div style={{ maxWidth:590, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:14 }}>🧘</div>
        <h1 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(25px,5vw,38px)", color:"white", fontWeight:700, lineHeight:1.2, marginBottom:10 }}>Questionário FFMQ-BR</h1>
        <p style={{ fontFamily:"'Lora',serif", fontStyle:"italic", color:"#94D2E8", fontSize:15, marginBottom:26, lineHeight:1.6 }}>Five Facet Mindfulness Questionnaire · Versão Brasileira Validada</p>
        <div style={{ background:"rgba(255,255,255,.06)", borderRadius:16, padding:"22px", marginBottom:26, border:"1px solid rgba(255,255,255,.09)" }}>
          <p style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,.8)", fontSize:14.5, lineHeight:1.75, marginBottom:16 }}>
            Este questionário avalia suas habilidades de <strong style={{ color:"#2DD4BF" }}>mindfulness</strong> em cinco dimensões. São <strong style={{ color:"white" }}>39 afirmações</strong> sobre como você geralmente se sente, pensa e age no cotidiano.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:6, marginBottom:12 }}>
            {Object.entries(factors).map(([k,f]) => (
              <span key={k} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 12px", borderRadius:30, fontSize:11.5, fontFamily:"'Inter',sans-serif", fontWeight:600, background:f.color+"22", color:f.color, border:`1px solid ${f.color}44` }}>
                {f.icon} {f.label.replace("\n"," ")}
              </span>
            ))}
          </div>
          <p style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,.35)", fontSize:12 }}>⏱ Tempo estimado: 8–12 minutos</p>
        </div>
        <div style={{ marginBottom:26 }}>
          <label style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,.55)", fontSize:13, display:"block", marginBottom:7, textAlign:"left" }}>Seu nome (opcional)</label>
          <input className="ni" placeholder="Como você gostaria de ser chamado(a)?" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setStep("test")} />
        </div>
        <button className="bp" onClick={()=>{setStep("test");setPage(0);}}>Iniciar Questionário →</button>
        <p style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,.2)", fontSize:11, marginTop:18 }}>Baer et al. (2006) · Barros et al. (2014) · Validado para população brasileira</p>
      </div>
    </div>
  );

  // ── TEST ───────────────────────────────────────────────────────────────────
  if (step === "test") {
    const progress = Math.round((answered / 39) * 100);
    let firstMissAssigned = false;

    return (
      <div ref={topRef} style={{ minHeight:"100vh", background:"#0f172a", fontFamily:"'Inter',sans-serif", paddingBottom:80 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
          *{box-sizing:border-box}
          .qcard{border-radius:16px;padding:20px 22px;margin-bottom:13px;transition:all .22s;border:2px solid transparent}
          .qcard.ok{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.07)}
          .qcard.done{background:rgba(45,212,191,.05);border-color:rgba(45,212,191,.24)}
          .qcard.miss{background:rgba(244,114,182,.07);border-color:#F472B6;animation:shk .4s ease}
          @keyframes shk{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
          .ob{flex:1;min-width:0;padding:9px 4px;border-radius:10px;border:1px solid rgba(255,255,255,.11);background:rgba(255,255,255,.04);color:rgba(255,255,255,.62);font-size:11px;cursor:pointer;transition:all .18s;text-align:center;font-family:'Inter',sans-serif;line-height:1.3}
          .ob:hover{border-color:#2DD4BF;color:#2DD4BF;background:rgba(45,212,191,.08)}
          .ob.sel{border-color:#2DD4BF;background:rgba(45,212,191,.18);color:#2DD4BF;font-weight:700}
          .ob.selm{border-color:#F472B6;background:rgba(244,114,182,.15);color:#F472B6;font-weight:700}
          .nb{padding:12px 28px;border-radius:50px;font-size:15px;font-weight:600;cursor:pointer;border:none;transition:all .2s;font-family:'Inter',sans-serif}
        `}</style>

        <div style={{ background:"rgba(15,23,42,.97)", backdropFilter:"blur(10px)", borderBottom:"1px solid rgba(255,255,255,.07)", padding:"13px 20px", position:"sticky", top:0, zIndex:10 }}>
          <div style={{ maxWidth:700, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ color:"white", fontFamily:"'Lora',serif", fontSize:15, fontWeight:700 }}>🧘 FFMQ-BR</span>
              <span style={{ color:"rgba(255,255,255,.42)", fontSize:13 }}>{answered}/39 respondidas</span>
            </div>
            <div style={{ height:4, background:"rgba(255,255,255,.08)", borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#2DD4BF,#3B82F6)", borderRadius:2, transition:"width .4s" }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth:700, margin:"0 auto", padding:"26px 18px" }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <span style={{ background:"rgba(45,212,191,.12)", color:"#2DD4BF", padding:"4px 14px", borderRadius:20, fontSize:13, fontWeight:600 }}>
              Página {page+1} de {totalPages}
            </span>
          </div>

          {missingIds.length > 0 && (
            <div style={{ background:"rgba(244,114,182,.1)", border:"1px solid rgba(244,114,182,.38)", borderRadius:12, padding:"13px 16px", marginBottom:18, display:"flex", alignItems:"flex-start", gap:10 }}>
              <span style={{ fontSize:18, flexShrink:0 }}>⚠️</span>
              <div>
                <div style={{ color:"#F472B6", fontWeight:700, fontSize:14, marginBottom:4 }}>
                  {missingIds.length === 1 ? "1 questão ainda não respondida:" : `${missingIds.length} questões ainda não respondidas:`}
                </div>
                <div style={{ color:"rgba(255,255,255,.6)", fontSize:13 }}>
                  {missingIds.length === 1
                    ? `Questão ${missingIds[0]} — selecione uma opção antes de continuar.`
                    : `Questões ${missingIds.join(", ")} — selecione uma opção em cada uma antes de continuar.`}
                </div>
              </div>
            </div>
          )}

          <p style={{ color:"rgba(255,255,255,.38)", fontSize:13, textAlign:"center", marginBottom:20 }}>Selecione a frequência que melhor descreve você em cada afirmação:</p>

          {pageQuestions.map(q => {
            const isMissing  = missingIds.includes(q.id);
            const isAnswered = !!answers[q.id];
            const cardClass  = `qcard ${isMissing ? "miss" : isAnswered ? "done" : "ok"}`;
            const refProps   = (isMissing && !firstMissAssigned) ? { ref: firstMissRef } : {};
            if (isMissing && !firstMissAssigned) firstMissAssigned = true;

            return (
              <div key={q.id} className={cardClass} {...refProps}>
                <div style={{ display:"flex", gap:11, marginBottom:13 }}>
                  <span style={{
                    background: isMissing ? "rgba(244,114,182,.22)" : isAnswered ? "rgba(45,212,191,.15)" : "rgba(255,255,255,.07)",
                    color: isMissing ? "#F472B6" : isAnswered ? "#2DD4BF" : "rgba(255,255,255,.45)",
                    borderRadius:"50%", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:700, flexShrink:0, transition:"all .2s"
                  }}>{q.id}</span>
                  <p style={{ color: isMissing ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.85)", fontSize:14.5, lineHeight:1.65, margin:0 }}>{q.text}</p>
                </div>

                {isMissing && (
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:9, fontSize:12, color:"#F472B6", fontWeight:600 }}>
                    <span>⚡</span> Selecione uma opção para continuar
                  </div>
                )}

                <div style={{ display:"flex", gap:5 }}>
                  {[1,2,3,4,5].map(v => {
                    const sel = answers[q.id] === v;
                    return (
                      <button key={v} className={`ob${sel ? (isMissing ? " selm" : " sel") : ""}`}
                        onClick={() => handleAnswer(q.id, v)} title={labels[v-1]}>
                        <div style={{ fontSize:16, fontWeight:700, marginBottom:2 }}>{v}</div>
                        <div style={{ fontSize:9.5, lineHeight:1.2, opacity:.8 }}>{labels[v-1].split(" ou ")[0]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ display:"flex", gap:12, justifyContent:"space-between", marginTop:26 }}>
            <button className="nb" onClick={prevPage}
              style={{ background: page===0?"rgba(255,255,255,.04)":"rgba(255,255,255,.09)", color: page===0?"rgba(255,255,255,.22)":"white", cursor: page===0?"default":"pointer" }}
              disabled={page===0}>← Anterior</button>
            <button className="nb" onClick={nextPage}
              style={{ background:"linear-gradient(135deg,#2DD4BF,#3B82F6)", color:"white", boxShadow:"0 4px 20px rgba(45,212,191,.3)" }}>
              {page < totalPages-1 ? "Próxima →" : "Ver Resultado ✨"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  const totalScore = Object.values(scores).reduce((a,b)=>a+b,0);
  const totalPct   = Math.round((totalScore / 195) * 100);

  async function downloadReport() {
    setGenerating(true);
    try {
      const scoreLines = Object.entries(factors).map(([k,f]) => {
        const s = scores[k], pct = Math.round((s/f.max)*100);
        return `${f.icon} ${f.label.replace("\n"," ")}: ${s}/${f.max} (${pct}%) — ${getLevel(pct).label}`;
      }).join("\n");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{ role:"user", content:`Você é especialista em mindfulness e psicologia positiva. Gere um relatório de devolutiva personalizado e acolhedor em português brasileiro, com base nos resultados do FFMQ-BR.\n\nNome: ${name||"Participante"}\nData: ${new Date().toLocaleDateString("pt-BR")}\nÍndice geral: ${totalPct}%\n\nResultados:\n${scoreLines}\n\nEscreva o relatório com estas seções:\n1. Saudação personalizada\n2. O que é mindfulness e o FFMQ-BR (breve)\n3. Análise de cada uma das 5 facetas com interpretação acolhedora\n4. Pontos fortes identificados\n5. Áreas de desenvolvimento com sugestões práticas\n6. Conclusão motivadora\n7. Referências\n\nTom: acolhedor, científico mas acessível, positivo e prático. Máximo 700 palavras.` }]
        })
      });
      const data = await res.json();
      const reportText = data.content?.[0]?.text || "Não foi possível gerar o relatório.";

      const ecx=200, ecy=200, eR=130, en=factorKeys.length;
      function ep(i,r){const a=(Math.PI*2*i)/en-Math.PI/2;return[ecx+r*Math.cos(a),ecy+r*Math.sin(a)];}
      const edpts=factorKeys.map((k,i)=>ep(i,eR*(scores[k]/factors[k].max)));
      const edpath=edpts.map(([x,y],i)=>`${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")+" Z";
      const egridPaths=[.25,.5,.75,1].map(r=>{const pts=factorKeys.map((_,i)=>ep(i,eR*r));return pts.map(([x,y],i)=>`${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")+" Z";});

      const radarSVG=`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="#0f172a" rx="16"/>
${egridPaths.map(d=>`<path d="${d}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`).join("")}
${factorKeys.map((_,i)=>{const[x,y]=ep(i,eR);return`<line x1="${ecx}" y1="${ecy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;}).join("")}
<path d="${edpath}" fill="rgba(45,212,191,0.18)" stroke="#2DD4BF" stroke-width="2.5" stroke-linejoin="round"/>
${edpts.map(([x,y],i)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${factors[factorKeys[i]].color}" stroke="#0f172a" stroke-width="2"/>`).join("")}
${factorKeys.map((k,i)=>{const f=factors[k];const[x,y]=ep(i,eR+34);const anchor=x<ecx-8?"end":x>ecx+8?"start":"middle";const lines=f.label.split("\n");return`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" fill="${f.color}" font-size="11" font-weight="700" font-family="sans-serif">${lines.map((l,li)=>`<tspan x="${x.toFixed(1)}" dy="${li===0?0:14}">${l}</tspan>`).join("")}</text>`;}).join("")}
${[.25,.5,.75,1].map(r=>{const[x,y]=ep(0,eR*r);return`<text x="${(x+4).toFixed(1)}" y="${(y-3).toFixed(1)}" fill="rgba(255,255,255,0.28)" font-size="8" font-family="sans-serif">${Math.round(r*100)}%</text>`;}).join("")}
</svg>`;

      const scoreCards=Object.entries(factors).map(([k,f])=>{
        const s=scores[k],pct=Math.round((s/f.max)*100),lvl=getLevel(pct);
        return`<div style="margin:10px 0;padding:14px 16px;border-radius:10px;background:${lvl.bg};border-left:4px solid ${f.color}">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
<div><span style="font-weight:700;color:${f.color}">${f.icon} ${f.label.replace("\n"," ")}</span><div style="font-size:12px;color:#64748b;margin-top:3px">${f.desc}</div></div>
<div style="text-align:right;flex-shrink:0;margin-left:12px"><span style="font-size:22px;font-weight:800;color:${f.color}">${pct}%</span><br/><span style="background:${lvl.color};color:white;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600">${lvl.label}</span></div></div>
<div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${f.color};border-radius:3px"></div></div>
<div style="font-size:12px;color:#94a3b8;margin-top:4px">${s}/${f.max} pontos</div></div>`;
      }).join("");

      const reportHTML=reportText.split("\n").map(l=>
        l.startsWith("##")?`<h3 style="color:#1e3a5f;margin:18px 0 5px;font-size:15px">${l.replace(/^#+\s*/,"")}</h3>`
        :l.startsWith("#")?`<h2 style="color:#1e3a5f;margin:22px 0 7px;font-size:17px">${l.replace(/^#+\s*/,"")}</h2>`
        :l.trim()?`<p style="color:#374151;line-height:1.78;margin:6px 0;font-size:14px">${l}</p>`
        :"<br/>"
      ).join("");

      const html=`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Relatório FFMQ-BR — ${name||"Participante"}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f8fafc;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{max-width:800px;margin:0 auto;background:white;padding:48px;min-height:100vh}
.hd{text-align:center;margin-bottom:32px;padding-bottom:22px;border-bottom:2px solid #e2e8f0}
.sec{font-family:'Lora',serif;font-size:17px;color:#1e3a5f;font-weight:700;margin:26px 0 11px;padding-bottom:5px;border-bottom:1px solid #e2e8f0}
@media print{body{background:white}.pg{padding:24px}}
</style></head><body><div class="pg">
<div class="hd">
<div style="font-family:'Lora',serif;font-size:25px;color:#1e3a5f;font-weight:700">🧘 Questionário FFMQ-BR</div>
<div style="color:#64748b;font-size:13px;margin-top:5px">Five Facet Mindfulness Questionnaire — Versão Brasileira</div>
<div style="display:flex;gap:18px;justify-content:center;margin-top:10px;font-size:13px;color:#94a3b8">
<span>👤 ${name||"Participante"}</span><span>📅 ${new Date().toLocaleDateString("pt-BR")}</span><span>❓ 39 questões</span></div></div>
<div style="text-align:center;padding:22px;background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:16px;margin-bottom:20px;color:white">
<div style="font-family:'Lora',serif;font-size:58px;font-weight:800;color:#2DD4BF;line-height:1">${totalPct}%</div>
<div style="font-size:14px;opacity:.78;margin-top:6px">Índice Geral de Mindfulness</div>
<div style="font-size:12px;opacity:.45;margin-top:2px">${totalScore} de 195 pontos</div></div>
<div class="sec">Gráfico de Facetas (Radar)</div>
<div style="display:flex;justify-content:center;margin:18px 0">${radarSVG}</div>
<div class="sec">Resultado por Faceta</div>${scoreCards}
<div class="sec">Relatório de Devolutiva</div>${reportHTML}
<div style="margin-top:38px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center">
Baer et al. (2006) • Barros et al. (2014) • Instrumento validado para população brasileira</div>
</div></body></html>`;

      const blob=new Blob([html],{type:"text/html"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url; a.download=`FFMQ_${(name||"resultado").replace(/\s+/g,"_")}.html`; a.click();
      URL.revokeObjectURL(url);
    } catch(e){ alert("Erro ao gerar relatório. Tente novamente."); }
    setGenerating(false);
  }

  return (
    <div ref={topRef} style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0f172a 0%,#1e3a5f 60%,#0f172a 100%)", fontFamily:"'Inter',sans-serif", padding:"40px 20px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
        *{box-sizing:border-box}
        .rc{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:20px;margin-bottom:13px;backdrop-filter:blur(8px)}
        .dlb{background:linear-gradient(135deg,#2DD4BF,#3B82F6);color:white;border:none;padding:15px 34px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .3s;box-shadow:0 8px 32px rgba(45,212,191,.35)}
        .dlb:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(45,212,191,.5)}
        .dlb:disabled{opacity:.6;cursor:not-allowed;transform:none}
        .retb{background:transparent;color:rgba(255,255,255,.42);border:1px solid rgba(255,255,255,.11);padding:11px 24px;border-radius:50px;font-size:14px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
        .retb:hover{border-color:rgba(255,255,255,.32);color:white}
      `}</style>

      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:30 }}>
          <div style={{ fontSize:42, marginBottom:10 }}>✨</div>
          <h1 style={{ fontFamily:"'Lora',serif", color:"white", fontSize:"clamp(22px,4vw,32px)", fontWeight:700, marginBottom:6 }}>
            {name ? `Parabéns, ${name.split(" ")[0]}!` : "Seu Resultado"}
          </h1>
          <p style={{ color:"rgba(255,255,255,.48)", fontSize:14 }}>Questionário das Facetas de Mindfulness — FFMQ-BR</p>
        </div>

        <div style={{ background:"linear-gradient(135deg,rgba(45,212,191,.15),rgba(59,130,246,.15))", border:"1px solid rgba(45,212,191,.3)", borderRadius:20, padding:"26px", textAlign:"center", marginBottom:26 }}>
          <div style={{ fontFamily:"'Lora',serif", fontSize:"clamp(48px,10vw,68px)", fontWeight:800, color:"#2DD4BF", lineHeight:1 }}>{totalPct}%</div>
          <div style={{ color:"rgba(255,255,255,.62)", fontSize:14, marginTop:8, fontStyle:"italic" }}>Índice Geral de Mindfulness</div>
          <div style={{ color:"rgba(255,255,255,.33)", fontSize:13, marginTop:4 }}>{totalScore} de 195 pontos</div>
        </div>

        <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)", borderRadius:20, padding:"22px 16px 16px", marginBottom:26, textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Lora',serif", color:"white", fontSize:17, marginBottom:18 }}>Perfil de Facetas</h2>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <RadarChart scores={scores} />
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginTop:14 }}>
            {Object.entries(factors).map(([k,f]) => {
              const pct = Math.round((scores[k]/f.max)*100);
              return (
                <div key={k} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"rgba(255,255,255,.6)" }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:f.color,flexShrink:0 }}/>
                  {f.label.replace("\n"," ")} <strong style={{ color:f.color }}>{pct}%</strong>
                </div>
              );
            })}
          </div>
        </div>

        <h2 style={{ fontFamily:"'Lora',serif", color:"white", fontSize:17, marginBottom:13 }}>Detalhamento por Faceta</h2>
        {Object.entries(factors).map(([key,f]) => {
          const s=scores[key], pct=Math.round((s/f.max)*100), lvl=getLevel(pct);
          return (
            <div key={key} className="rc">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:f.color, fontWeight:700, fontSize:14.5 }}>{f.icon} {f.label.replace("\n"," ")}</div>
                  <div style={{ color:"rgba(255,255,255,.38)", fontSize:11.5, marginTop:3 }}>{f.desc}</div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:14 }}>
                  <div style={{ color:f.color, fontWeight:800, fontSize:22 }}>{pct}%</div>
                  <div style={{ background:lvl.color, color:"white", padding:"2px 9px", borderRadius:20, fontSize:10.5, fontWeight:600, marginTop:3 }}>{lvl.label}</div>
                </div>
              </div>
              <div style={{ height:6, background:"rgba(255,255,255,.08)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${pct}%`, background:f.color, borderRadius:3, transition:"width 1.2s ease" }} />
              </div>
              <div style={{ color:"rgba(255,255,255,.28)", fontSize:11, marginTop:4 }}>{s}/{f.max} pontos</div>
            </div>
          );
        })}

        <div style={{ background:"rgba(255,255,255,.03)", borderRadius:12, padding:"11px 15px", marginBottom:26, border:"1px solid rgba(255,255,255,.07)", display:"flex", gap:14, flexWrap:"wrap" }}>
          {[{label:"Elevado (≥75%)",color:"#34D399"},{label:"Moderado (50–74%)",color:"#F59E0B"},{label:"Em desenvolvimento (<50%)",color:"#F472B6"}].map(l=>(
            <div key={l.label} style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:"rgba(255,255,255,.5)" }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:l.color }}/>{l.label}
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginBottom:14 }}>
          <button className="dlb" onClick={downloadReport} disabled={generating}>
            {generating ? "⏳ Gerando com IA…" : "⬇ Baixar Relatório Completo"}
          </button>
          <p style={{ color:"rgba(255,255,255,.28)", fontSize:12, marginTop:8 }}>
            Inclui gráfico radar + devolutiva personalizada gerada por IA
          </p>
        </div>

        <div style={{ textAlign:"center" }}>
          <button className="retb" onClick={()=>{setAnswers({});setPage(0);setMissingIds([]);setStep("intro");}}>
            ↩ Refazer o questionário
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:34, color:"rgba(255,255,255,.16)", fontSize:11 }}>
          Baer et al. (2006) · Barros et al. (2014) · Validado para população brasileira
        </div>
      </div>
    </div>
  );
}
