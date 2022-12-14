import React, { useEffect, useState } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdCreate, MdLocalShipping } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { FcShipped } from "react-icons/fc";
import { AiOutlineCheck } from "react-icons/ai";

export const TimelineElement = ({ item }) => {
  const [title, setTitle] = useState(null);
  const [icon, setIcon] = useState(null);
  const [bgcolor, setBgColor] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    switch (item.Value.currentState) {
      case 1:
        setTitle("Sipariş Oluşturuldu");
        setIcon(<BiBookAdd />);
        setBgColor("#005bc5");
        setColor("#fff");
        break;
      case 2:
        setTitle("Sevkiyat Tanımlandı");
        setIcon(<MdCreate />);
        setBgColor("#005bc5");
        setColor("#fff");
        break;
      case 3:
        setTitle("Sevkiyat Kaydı Oluşturuldu");
        setIcon(<MdLocalShipping />);
        setBgColor("#ffbc11");
        setColor("#fff");
        break;
      case 4:
        setTitle("Sevkiyat Teslim Edildi");
        setIcon(<FcShipped />);
        setBgColor("#ffbc11");
        setColor("#fff");
        break;
      case 5:
        setTitle("Sevkiyat Teslim Alındı");
        setIcon(<AiOutlineCheck />);
        setBgColor("#0d6759");
        setColor("#fff");
        break;
      default:
        break;
    }
  }, [item]);

  return (
    title &&
    icon &&
    color &&
    bgcolor && (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: `${bgcolor}`, color: `${color}` }}
        contentArrowStyle={{ borderRight: `7px solid ${bgcolor}` }}
        date={item.Tİmestamp}
        iconStyle={{ background: `${bgcolor}`, color: `${color}` }}
        icon={icon}
      >
        <h4 className="vertical-timeline-element-title">{title}</h4>
        {/* <h6 className="vertical-timeline-element-subtitle">{item.Timestamp}</h6> */}
        <p>Gerçekleştiren: {item.Value.modifiedBy}</p>
        {item.Value.currentState === 2 && (
          <p>Kargo Firması: {item.Value.shipperId}</p>
        )}
        {item.Value.currentState === 3 && (
          <p>Takip Kodu: {item.Value.trackingInfo}</p>
        )}
        <small>{item.Timestamp}</small>
      </VerticalTimelineElement>
    )
  );
};
