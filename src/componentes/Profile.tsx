import React, { useState, useCallback } from "react";
import Webcam from "react-webcam";
import vite from "../../public/vite.svg"
const videoConstraints : any = {
  width: 150,
  height: 150,
  facingMode: "environment",
};

const Profile = ({ setData, data } : any) => {
  const [isLigada, setIsLigada] = useState<boolean>(false);
  const webcamRef = React.useRef<Webcam>(null);

 
  
  const capture = useCallback(() => {
      const pictureSrc = webcamRef.current?.getScreenshot();
      if(pictureSrc){
          setData({...data, foto: pictureSrc});
        }
    },[data]);

    

  return (
    <div className="picture">
      <div>
        {!isLigada ? (
          <img src={data.foto || vite} alt="logo" />
        ) : data.foto === undefined ? (
          <Webcam
            className="webcam"
            audio={false}
            height={200}
            ref={webcamRef}
            width={200}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={data.foto} alt="face" />
        )}
      </div>

      <div>
        {data.foto !== undefined ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setData({...data, foto: undefined});
              setIsLigada(true);
            }}
            className="btn btn-primary"
          >
            Tentar novamente
          </button>
        ) : (
          <div className="btn_capturar">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLigada(!isLigada);
              }}
              className="btn btn-danger"
            >
              {isLigada ? "Desligar Camera" : "Ligar Camera"}
            </button>
            <button
              disabled={!isLigada}
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="btn btn-danger"
            >
              Tirar foto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
