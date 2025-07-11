const ShimmerCircle = () => {
  const circleRef = useRef();

  useEffect(() => {
    let x = -200;
    let y = -200;

    const interval = setInterval(() => {
      x += 5;
      y += 5;
      if (x > 1100) x = -200;
      if (y > 470) y = -200;

      if (circleRef.current) {
        circleRef.current.setAttribute("cx", x.toString());
        circleRef.current.setAttribute("cy", y.toString());
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <circle
      ref={circleRef}
      r="200"
      fill="url(#shimmerGrad)"
      mask="url(#strokeMask)"
    />
  );
};

