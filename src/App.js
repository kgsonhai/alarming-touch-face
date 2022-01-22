import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import '@tensorflow/tfjs-backend-cpu';
import * as tf from '@tensorflow/tfjs';
import { Howl } from 'howler';
import { initNotifications, notify } from '@mycv/f8-notification';
import soundURL from './music/handown.mp3';
import dynamicImg from './dynamic.gif'
import anhvui from './vui.svg'
import anhbuon from './buon.svg'
import ProgressBar from './component/Progress';


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
  const [touched, setTouched] = useState(false);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('');
  const dem = useRef(0);

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

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { video: true },
          stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          error => reject(error)
        );
      } else {
        reject();
      }
    });
  }

  const train = async label => {
    console.log(`${label} Đang train cho khuôn mặt của bạn...`);
    for (let i = 0; i < TRAINING_TIMES; i++) {
      let progress = parseInt((i + 1) / TRAINING_TIMES * 100) + "%";
      console.log("Progress " + progress);
      setStatus("The robot is learning : " + progress);
      dem.current = i;
      if (i === 49) {
        setStatus('');
      }

      await training(label);
    }
    setIndex(index + 1);
  }

  const training = label => {
    return new Promise(async resolve => {
      const embedding = mobinetModule.current.infer(
        video.current,
        true
      );
      classifier.current.addExample(embedding, label);
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

    if (result.label === TOUCHED && result.confidences[result.label] > TOUCH_CONFIDENT) {
      console.log('Touched');
      if (canPlaySound.current) {
        canPlaySound.current = false;
        sound.play();
      }
      notify('Bỏ tay ra', { body: 'Bạn vừa chạm tay vào mặt!!' });
      setTouched(true);
    } else {
      console.log('Not_touched');
      setTouched(false);
    }
    setIndex(index + 1);
    setStatus('Program completed!! Please bring your hand to your face to check....');

    await sleep(200);

    run();
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    init();

    sound.on('end', function () {
      canPlaySound.current = true;
    });
  }, [])

  return (
    <div className={`${touched ? 'canhbao' : 'tatcanhbao'}`}>
      <div className={`main ${touched ? "touched" : ""}`}>

        <div className={`container ${touched ? 'videoNo' : ''}`}>
          <video
            ref={video}
            className='video'
            autoPlay
          />

          <div className="control">
            <div className={`${index === 0 ? '' : 'button_current'}`}>
              {status === '' ? <p>Step 1: Record a video without touching your face for the robot to learn</p> : status}
              {status === '' ? <button className="btn" onClick={() => train(NOT_TOUCH)}>START</button> : ''}
              {status && <ProgressBar value={dem}/> }
              <img className='dynamicImg' src={dynamicImg} height='80px' width='80px' />
            </div>
            <div className={`${index === 1 ? '' : 'button_current'}`}>
              {status === '' ? <p>Step 2: Record a video of putting your hand on your face for the robot to learn</p> : status}
              {status === '' ? <button className="btn" onClick={() => train(TOUCHED)}>NEXT</button> : ''}
              {status && <ProgressBar value={dem}/> }
              <img className='dynamicImg' src={dynamicImg} height='80px' width='80px' />
            </div>
            <div className={`${index === 2 ? '' : 'button_current'}`}>
              <p>Step 3: AI READY</p>
              <button className="btn" onClick={() => run()}>TESTING</button>
            </div>
            <div className={`${index === 3 ? '' : 'button_current'}`}>
              <p>{status}</p>
            </div>
          </div>
        </div>


      </div>
    </div>

  );
}

export default App;
