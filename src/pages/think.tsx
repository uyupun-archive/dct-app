import React from "react";
import { Button } from "../components/button";

const Think: React.FC = () => {
  return (
    <div>
      <h1>考え中</h1>
      <div>
        <span>歩数: </span>100<span>歩</span>
      </div>
      <p>
        Q.
        問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い問い
      </p>
      <Button>カンニングする！</Button>
      <Button>答え出た！</Button>
    </div>
  );
};

export { Think };
