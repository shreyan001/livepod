import React, { useRef, useState } from "react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
/* Uncomment to see the Xstate Inspector */
// import { Inspect } from '@huddle01/react/components';

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
  useRecording,
} from "@huddle01/react/hooks";

import { useDisplayName } from "@huddle01/react/app-utils";

import Button from "../components/Button";


const livemeet = () => {

    const videoRef = useRef();

    const { state, send } = useMeetingMachine();
  
    const [roomId, setRoomId] = useState("");
    const [displayNameText, setDisplayNameText] = useState("Guest");
    const [projectId, setProjectId] = useState(
      process.env.NEXT_PUBLIC_PROJECT_ID || ""
    );
    const [accessToken, setAccessToken] = useState("");
  
    const { initialize } = useHuddle01();
    const { joinLobby } = useLobby();
    const {
      fetchAudioStream,
      produceAudio,
      stopAudioStream,
      stopProducingAudio,
      stream: micStream,
    } = useAudio();
    const {
      fetchVideoStream,
      produceVideo,
      stopVideoStream,
      stopProducingVideo,
      stream: camStream,
    } = useVideo();
    const { joinRoom, leaveRoom } = useRoom();
  
    // Event Listner
    useEventListener("lobby:cam-on", () => {
      if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
    });
  
    const { peers } = usePeers();
  
    const {
      startRecording,
      stopRecording,
      error,
      data: recordingData,
    } = useRecording();
  
    const { setDisplayName, error: displayNameError } = useDisplayName();
  
    useEventListener("room:joined", () => {
      console.log("room:joined");
    });
    useEventListener("lobby:joined", () => {
      console.log("lobby:joined");
    });

 return ( <div>

        <div className="main">
            <div className="videobox">
</div><div className="chatbox"></div>
        </div>
        




 </div> );
}
 
export default livemeet;