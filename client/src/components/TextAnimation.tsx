import "../styles/TextAnimation.css";

interface TextAnimationProps {
  className?: string;
}

const TextAnimation = ({ className }: TextAnimationProps) => {
  return (
    <h1
      className={`text-9xl text-center font-black cursor typewriter thick${className}`}></h1>
  );
};

export default TextAnimation;
