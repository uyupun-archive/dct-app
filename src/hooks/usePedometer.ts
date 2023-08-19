import { useEffect } from "react";
import { useAtom } from "jotai";
import { stepCountAtom } from "../atoms/stepCount";

/// ref: https://qiita.com/juginon/items/0ffe16e027d6024a93f8
const usePedometer = () => {
  // 歩数
  const [stepCount, setStepCount] = useAtom(stepCountAtom);

  let filterData = { x: 0, y: 0, z: 0 };
  let axisResult = { x: 0, y: 0, z: 0 };
  let axisNew = { x: 0, y: 0, z: 0 };
  let axisOld = { x: 0, y: 0, z: 0 };

  // 動的しきい値のサンプル数
  const THRESHOLD = 50;
  let sampleCount = 0;
  let filterCount = 0;

  // 3軸それぞれの最小値に100, 最大値に-100を初期値で入れることで
  // データ入力後すぐに更新できるようにする
  let acXMin = 100;
  let acYMin = 100;
  let acZMin = 100;
  let acXMax = -100;
  let acYMax = -100;
  let acZMax = -100;

  // しきい値
  let dcX = 0;
  let dcY = 0;
  let dcZ = 0;

  // 加速度変化の最も大きい軸
  let thresholdLevel = 0;

  const onDeviceMotion = (e: DeviceMotionEvent) => {
    e.preventDefault();
    const ac = e.acceleration;

    if (filterCount < 3) {
      // 3軸のデータそれぞれの4データ分の平均を計算し平滑化する
      filterCount++;
      filterData.x += ac?.x || 0;
      filterData.y += ac?.y || 0;
      filterData.z += ac?.z || 0;
      return;
    } else {
      filterCount = 0;
      axisResult = {
        x: filterData.x / 4,
        y: filterData.y / 4,
        z: filterData.z / 4,
      };
      filterData = { x: 0, y: 0, z: 0 };
    }

    // 3軸それぞれの加速度の最小値・最大値を計算する
    acXMin = Math.min(axisResult.x, acXMin);
    acYMin = Math.min(axisResult.y, acYMin);
    acZMin = Math.min(axisResult.z, acZMin);
    acXMax = Math.max(axisResult.x, acXMax);
    acYMax = Math.max(axisResult.y, acYMax);
    acZMax = Math.max(axisResult.z, acZMax);

    sampleCount++;

    // サンプル数が50を超えたらしきい値を変更する
    if (sampleCount > THRESHOLD) {
      sampleCount = 0;
      // 3軸の加速度の最小値・最大値からしきい値を決定する
      dcX = (acXMax - acXMin) / 2;
      dcY = (acYMax - acYMin) / 2;
      dcZ = (acZMax - acZMin) / 2;
      // 初期化
      acXMax = acYMax = acZMax = -100;
      acXMin = acYMin = acZMin = 100;
    }

    // 現在の加速度のベクトルを計算
    const resultVector = Math.sqrt(
      Math.pow(axisResult.x, 2) +
        Math.pow(axisResult.y, 2) +
        Math.pow(axisResult.z, 2)
    );

    // 動的精度はとりあえず1.0の固定値とする
    if (resultVector > 1.0) {
      // 加速度変化が1.0以上あった場合、axisOldとaxisNewを更新する
      axisOld = { x: axisNew.x, y: axisNew.y, z: axisNew.z };
      axisNew = { x: axisResult.x, y: axisResult.y, z: axisResult.z };
    } else {
      // そうでない場合はaxisOldのみを更新する
      axisOld = { x: axisNew.x, y: axisNew.y, z: axisNew.z };
      return;
    }

    // 3軸の中でどれが一番加速度変化が大きかったかで条件分岐
    const absXChange = Math.abs(axisResult.x);
    const absYChange = Math.abs(axisResult.y);
    const absZChange = Math.abs(axisResult.z);
    if (absXChange > absYChange && absXChange > absZChange) {
      // X軸が一番大きかった場合
      thresholdLevel = dcX;
      if (axisOld.x > thresholdLevel && thresholdLevel > axisNew.x) {
        // 加速度の傾きが負 かつ しきい値を跨いでいる場合は1歩と判定
        setStepCount((prev) => prev + 1);
      }
    } else if (absYChange > absXChange && absYChange > absZChange) {
      thresholdLevel = dcY;
      // Y軸が一番大きかった場合
      if (axisOld.y > thresholdLevel && thresholdLevel > axisNew.y) {
        setStepCount((prev) => prev + 1);
      }
    } else if (absZChange > absXChange && absZChange > absYChange) {
      thresholdLevel = dcZ;
      // Z軸が一番大きかった場合
      if (axisOld.z > thresholdLevel && thresholdLevel > axisNew.z) {
        setStepCount((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    // DeviceMotionEvent.requestPermission()がそもそもiOSだけのメソッドかつ、TypeScriptでは定義されていないため型エラーになる
    // そのため、iOSは対応しない
    addEventListener("devicemotion", onDeviceMotion);

    return () => {
      removeEventListener("devicemotion", onDeviceMotion);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stepCount };
};

export { usePedometer };
