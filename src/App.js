import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import '@tensorflow/tfjs-backend-cpu';
import * as tf from '@tensorflow/tfjs';
import { Howl } from 'howler';
import { initNotifications, notify } from '@mycv/f8-notification';
import soundURL from './music/mymusiccut.mp3';

var sound = new Howl({
  src: [soundURL]
});

const NOT_TOUCH = 'not_touch';
const TOUCHED = 'touched';
const TRAINING_TIMES = 50;
const TOUCH_CONFIDENT = 0.7;


function App() {
  const video = useRef();
  const classifier = useRef();
  const canPlaySound = useRef(true);
  const mobinetModule = useRef();
  const [touched,setTouched] = useState(false);

  const init = async () => {
    console.log('init..');
    await setupCamera();
    console.log('success camera');

    classifier.current = knnClassifier.create();

    mobinetModule.current = await mobilenet.load();

    console.log('Không chạm tay lên mặt và ấn Train 1');

    initNotifications({ cooldown: 3000 });

  }

  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

      if(navigator.getUserMedia){
        navigator.getUserMedia(
          {video:true},
          stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata',resolve);
          },
          error => reject(error)
        );
      }else{
        reject();
      }
    });
  }

  const train = async label => {
    console.log(`${label} Đang train cho khuôn mặt của bạn...`);
    for(let i = 0; i < TRAINING_TIMES; i++){
      let progress = "Progress " + parseInt((i+1) / TRAINING_TIMES * 100) +"%";
      console.log(progress);
 
      await training(label);
    }
  }

  const training = label => {
    return new Promise(async resolve => {
      const embedding = mobinetModule.current.infer(
        video.current,
        true
      );
      classifier.current.addExample(embedding,label);
      await sleep(100);
      resolve();
      
    })
  }

  const run = async () => {
    const embedding = mobinetModule.current.infer(
      video.current,
      true
    );
    const result = await classifier.current.predictClass(embedding);
    // console.log('Label: ', result.label);
    // console.log('Confidences: ', result.confidences);

    if(result.label === TOUCHED && result.confidences[result.label] > TOUCH_CONFIDENT){
      console.log('Touched');
      if(canPlaySound.current){
        canPlaySound.current = false;
        sound.play();
      }
      notify('Bỏ tay ra', { body: 'Bạn vừa chạm tay vào mặt!!' });
      setTouched(true);
    }else{
      console.log('Not_touched');
      setTouched(false);
    }

    await sleep(200);

    run();
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve,ms))
  }

  useEffect(()=> {
    init();

    sound.on('end', function(){
      canPlaySound.current = true;
    });
  },[])

  return (
    <div className={`main ${touched ? "touched" : ""}`}>

      <video
      ref={video} 
      className="video"
      autoPlay 
      />

      <div className="control">
        <button className="btn" onClick={()=>train(NOT_TOUCH)}>Train 1</button>
        <button className="btn" onClick={()=>train(TOUCHED)}>Train 2</button>
        <button className="btn" onClick={()=>run()}>Train 3</button>
      </div>

    </div>
  );
}

export default App;
