import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {AiFillStar} from "react-icons/ai";
import { TimelineElement } from "./TimelineElement";

const Timeline = ({items}) => {
  return (
    <VerticalTimeline>
        {
            items.map((item,index) => {
                return (
                    <TimelineElement key={index} item={item} />
                )
            })
        }

      <VerticalTimelineElement
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        icon={<AiFillStar />}
      />
    </VerticalTimeline>
  );
};

export default Timeline;