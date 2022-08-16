import { FrameToFrame, createEvent } from "../../../core/client/client.js";
import { segment } from "oicq";

export const rule = {
  bilibili_analysis: {
    reg: "(b23.tv)|(bili(22|23|33|2233).cn)|(.bilibili.com)|(^(av|cv)(\\d+))|(^BV([a-zA-Z0-9]{10})+)",
    priority: 800,
    describe: "哔哩哔哩链接解析",
  },
};


export async function bilibili_analysis(e) {
  let event = await createEvent(e);

  FrameToFrame({
    _package: "bilibili_analysis",
    _handler: "analysis_main",
    params: {
      event: event,
    },
    onData(error, response) {
      if (error) {
        console.log(error.stack);
      } else {
        if (response.message) {
          e.reply(response.message);
        } else {
          let image = response.messageList.shift();
          e.reply([segment.image(image), ...response.messageList]);
        }
      }
    },
  });

  return true;

}