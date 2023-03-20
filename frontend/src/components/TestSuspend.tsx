import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner/Spinner";

const postData = fetchPosts();

// Posts component (definition)
const Posts = () => {
  // No need for loading states
  const posts = postData();
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}></div>;
};

// Fetch external data
function fetchPosts() {
  let result: any = null;
  let status = "pending";
  let url = `https://jsonplaceholder.typicode.com/posts`;

  let suspender = fetch(url)
    .then((res) => res.json())
    .then(
      (data) => {
        status = "fulfilled";
        result = data;
      },
      (error) => {
        status = "error";
        result = error;
      }
    );

  return () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "error") {
      return result;
    } else {
      //fulfilled
      return result;
    }
  };
}

export function TestSuspend() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <React.Suspense fallback={<Spinner />}>
        <Posts />
      </React.Suspense>
    </div>
  );
}
