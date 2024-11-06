import loadingHeartAnimation from "../public/loadingHeartAnimation.json";
import Lottie from "react-lottie";

const InitializedLoadingPage = () => {
  const loadingHeartAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingHeartAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie options={loadingHeartAnimationOptions} height={350} width={360} />
    </div>
  );
};

export default InitializedLoadingPage;
