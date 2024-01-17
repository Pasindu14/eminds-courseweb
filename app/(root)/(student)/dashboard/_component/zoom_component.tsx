"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

const ZoomComponent = () => {
  return (
    <div className="relative">
      <Button className="rounded-xl" onClick={initZoomApp}>
        Live Class
      </Button>
      <div id="meetingSDKElement" className="relative "></div>
    </div>
  );
};

async function initZoomApp() {
  const { client, clientConf } = await initClient();
  startMeeting(client, clientConf);
}

async function initClient() {
  const ZoomMtgEmbedded = await (
    await import("@zoomus/websdk/embedded")
  ).default;
  const client = ZoomMtgEmbedded.createClient();

  const clientConf = {
    authEndpoint: "http://localhost:3000/zoom",
    sdkKey: "b6cgqw6sQR2ffYq7oiXXw",
    signature: "",
    meetingNumber: "79915606272", // actual meeting number: user need to input
    passWord: "pLGehFTXyLYYQ9nc7kyc4YeTH6oqL6.1", // actual password for the meeting: user need to input
    role: 0, // 0 implies client, 1 implies host
    userName: "React", // username: user need to input
    userEmail: "", // user email: user need to input
  };
  // fetch signature to your auth endpoint. Check the sample repo.
  // https://github.com/zoom/meetingsdk-auth-endpoint-sample
  const signature = await getSignature(
    clientConf.meetingNumber,
    clientConf.role
  );

  clientConf.signature = signature;

  const meetingSDKElement = document.getElementById("meetingSDKElement");
  client.init({
    debug: true,
    zoomAppRoot: meetingSDKElement!,
    language: "en-US",
    customize: {
      video: {
        isResizable: true,
        viewSizes: {
          default: {
            width: 1000,
            height: 600,
          },
          ribbon: {
            width: 300,
            height: 700,
          },
        },
      },
      meetingInfo: [
        "topic",
        "host",
        "mn",
        "pwd",
        "telPwd",
        "invite",
        "participant",
        "dc",
        "enctype",
      ],
      toolbar: {
        buttons: [
          {
            text: "Custom Button",
            className: "CustomButton",
            onClick: () => {
              console.log("Hi, mom");
            },
          },
        ],
      },
    },
  });

  return { client: client, clientConf: clientConf };
}

async function getSignature(meetingNumber: any, role: any): Promise<string> {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: "b6cgqw6sQR2ffYq7oiXXw",
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: iat + 60 * 60 * 2,
  };

  var KJUR = require("jsrsasign");

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    "LBPRCSWEWUeE2GSatwooZaubnfcRYskC"
  );

  return signature;
}

function startMeeting(client: any, clientConf: any) {
  client.join({
    signature: clientConf.signature,
    sdkKey: clientConf.sdkKey,
    meetingNumber: clientConf.meetingNumber,
    password: clientConf.passWord,
    userName: clientConf.userName,
    userEmail: clientConf.userEmail,
  });
}

export default ZoomComponent;
