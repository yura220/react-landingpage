function MainAbout({ subject, id }) {
  return (
    <section id={id}>
      <div className="wrap">
        <h2 className="h1">{subject}</h2>
      </div>
    </section>
  );
}

export default MainAbout;