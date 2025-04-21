import { Spinner } from "react-bootstrap";
import "animate.css";

interface LoadingProps {
  text?: string;
  isFullPage?: boolean;
}

function Loading({ text, isFullPage = false }: LoadingProps) {
  return (
    /**
     * Use animate__animated as a base class for all animations
     *
     * Animationns:
     * animate__fadeIn: Animation class for fade-in effect
     * animate__fadeInDown: Animation class for fade-in down effect
     * animate__fadeInUp: Animation class for fade-in up effect
     * animate__fadeInLeft: Animation class for fade-in left effect
     * animate__fadeInRight: Animation class for fade-in right effect
     * animate__zoomIn: Animation class for zoom-in effect
     * animate__bounceIn: Animation class for bounce-in effect
     * animate__slideInUp: Animation class for slide-in up effect
     */

    <div
      className={`d-flex flex-column justify-content-center align-items-center animate__animated animate__zoomIn ${
        isFullPage ? "vh-100 " : "mt-5 "
      }`}
    >
      <Spinner animation="grow" role="status" variant="primary" />
      {text && <span className="mt-2 text-muted">{text}</span>}
    </div>
  );
}

export default Loading;
