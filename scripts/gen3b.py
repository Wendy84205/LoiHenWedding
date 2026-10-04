TAIL = """const MAP_SRC = "MAPURL";

function NodeContent({ node, count }) {
  if (node.kind === "photo") {
    return (
      <div className="t3n-photo" style={{ backgroundImage: `url(${node.src})` }} />
    );
  }
  if (node.kind === "blank") return null;
  if (node.kind === "text") {
    return (
      <div className={`t3n-textwrap ${node.cls}`}>
        {node.lines.map((line, index) => (
          <p key={`${node.id}-${index}`}>{line}</p>
        ))}
      </div>
    );
  }
  if (node.kind === "countdown") return <Countdown values={count} className="t3n-countdown" />;
  if (node.kind === "calendar") {
    return (
      <div className="t3n-cal">
        <div className="template-three">
          {CAL_EMPTY.map((key) => (
            <div key={key} className="empty"><div /></div>
          ))}
          {CAL_DAYS.map((day) => (
            <div key={day}>
              {day === 25 && <img className="heart-date" src="/assets/template3-ref/calen-heart.png" alt="" />}
              <div className={day === 25 ? "colorF" : undefined}>{day}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (node.kind === "map") {
    return (
      <div className="t3n-map">
        <iframe title="map" width="100%" height="100%" frameBorder="0" src={MAP_SRC} allowFullScreen />
      </div>
    );
  }
  return null;
}

export default function Template3New() {
  const count = useInvitationPage("template3new-page", "2025-03-25T16:00:00+07:00");

  return (
    <main className="new-invitation-page t3n">
      <MusicButton className="t3n-music" />

      <div className="t3n-canvas">
        {NODES.map((node) => (
          <Reveal
            key={node.id}
            direction={node.direction}
            delay={node.delay}
            duration={1.3}
            className={`t3n-node t3n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} count={count} />
          </Reveal>
        ))}
      </div>

      <section className="t3n-extras">
        <WishForm className="t3n-wish" accent="#7b2121" />
        <GiftNote className="t3n-gift" />
      </section>
    </main>
  );
}
"""
MAPURL = "https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed"
head = open('/tmp/t3_nodes_part.jsx').read()
head = head.replace('width: 100pct', "width: '100%'")
body = TAIL.replace('MAPURL', MAPURL)
open('/tmp/Template3New.jsx', 'w').write(head + body)
print('ok')
