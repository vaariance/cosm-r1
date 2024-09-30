"use client";
import "@vaariance/ui/styles.css";
import { Button } from "@vaariance/ui";

export default function Web() {
  return (
    <div className="flex-1 items-center justify-center">
      <h1>Web</h1>
      <Button onPress={() => console.log("Pressed!")}>click me</Button>
    </div>
  );
}
