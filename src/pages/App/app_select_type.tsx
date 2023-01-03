import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import App_header from "../../components/common/App_header";
import { App_product_view } from "../../components/common/App_product_view";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { productState, profileState } from "../../atoms/app_atoms";
import { fetcher } from "../../utils";
import useSWR from "swr";
import useEffectCustom from "../../components/common/useEffectCustom";
interface Device {
  model_name: string;
}
interface Color {
  model_name: string;
  model_id: number;
  color_name: string;
  color_code: string;
}
type Select = {
  label: string;
  device: string[];
  handleChangeSituation: (value: string, index: number) => void;
  index: number;
};
const app_select_type: NextPage = () => {
  const [product, setProduct] = useRecoilState(productState);
  const { user_name } = useRecoilValue(profileState);
  const getDevice = () => {
    const { data, error } = useSWR("/api/app_sql?sql=device", fetcher);
    return {
      allDevice: data,
      isLoading: !error && !data,
      isError: error,
    };
  };
  const getColor = () => {
    const { data, error } = useSWR("/api/app_sql?sql=color", fetcher);
    return {
      allColor: data,
      isLoading: !error && !data,
      isError: error,
    };
  };
  const { allDevice } = getDevice();
  const { allColor } = getColor();
  const MODEL = ["iPhone", "Android"];
  const [situation, setSituation] = useState<string[]>([]);
  const [device, setDevice] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);

  const handleChangeSituation = (value: string, index: number) => {
    if (index === 0) {
      let defaultDevice: Device[] = [];
      let defaultColor: Color[] = [];

      if (value === "iPhone") {
        defaultDevice = allDevice.filter(
          (val: Device) => val.model_name.includes(value) === true
        );

        defaultColor = allColor.filter(
          (val: Color) => val.model_name === defaultDevice[0]["model_name"]
        );
      } else {
        defaultDevice = allDevice.filter(
          (val: Device) => val.model_name.includes("iPhone") === false
        );
        console.log(defaultDevice);
        defaultColor = allColor.filter(
          (val: Color) => val.model_name === defaultDevice[0]["model_name"]
        );
      }
      console.log(defaultColor);

      setSituation([
        value,
        defaultDevice[0].model_name,
        defaultColor[0].color_name,
      ]);
    }

    if (index === 1) {
      const defaultColor = allColor.filter(
        (val: Color) => val.model_name === value
      );

      setSituation((prevState) => [
        prevState[0],
        value,
        defaultColor[0].color_name,
      ]);
    }
    if(index === 2){
        setSituation((prevState) => [
            prevState[0],
            prevState[1],
            value,
          ]);
    }
  };

  useEffect(() => {
    if (color && device) {
      // console.log(device);
      // console.log(color);
      console.log(situation);

      setProduct((prevState) => ({
        ...prevState,
        product_name: situation[1],
        product_place: `/${situation[0]}/${situation[1]}/${situation[2]}.png`,
        m_product_category: `${user_name}`,
      }));
    }
  }, [color, device]);
  //   初期化
  useEffect(() => {
    if (allDevice && allColor) {
      console.log(allDevice);
      console.log(allColor);
      // console.log(situation);
      setSituation(["iPhone", allDevice[0].model_name, allColor[0].color_name]);
    }
  }, [allDevice, allColor]);

  //   セレクトに合わせて選択肢を変更
  useEffect(() => {
    setDevice([]);
    setColor([]);
    if (allDevice) {
      //   console.log(allColor);

      if (situation[0] === "iPhone") {
        allDevice.map((value: Device) => {
          if (value.model_name.includes("iPhone")) {
            // console.log(value.model_name);
            setDevice((prevState) => [...prevState, value.model_name]);
          }
        });
        // console.log(allDevice);
        // console.log(device);
      } else {
        allDevice.map((value: Device) => {
          if (!value.model_name.includes("iPhone")) {
            // console.log(value.model_name);
            setDevice((prevState) => [...prevState, value.model_name]);
          }
        });
      }
    }

    if (allColor) {
      allColor.map((value: Color) => {
        if (situation[1] === value.model_name) {
          setColor((prevState) => [...prevState, value.color_name]);
        }
      });
      //   console.log(color);
    }
  }, [situation]);

  return (
    <div>
      <App_header label="オリジナル" />
      <App_product_view width={100} />
      <div>
        <Select
          label={"デバイス"}
          device={MODEL}
          handleChangeSituation={handleChangeSituation}
          index={0}
        />
        <Select
          label={"機種"}
          device={device}
          handleChangeSituation={handleChangeSituation}
          index={1}
        />
        <Select
          label={"カラー"}
          device={color}
          handleChangeSituation={handleChangeSituation}
          index={2}
        />
      </div>
    </div>
  );
};

const Select = ({ label, device, handleChangeSituation, index }: Select) => {
  return (
    <div>
      {label}{" "}
      <select
        onChange={(e) => {
          handleChangeSituation(e.currentTarget.value, index);
        }}
      >
        {device &&
          device.map((value: string, index) => {
            return (
              <option key={index} value={value}selected={index === 0? true:false}>
                {value}
              </option>
            );
          })}
      </select>
    </div>
  );
};
export default app_select_type;
