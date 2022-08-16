import re
from .analysis_bilibili import b23_extract, bili_keyword
from core import Handler, Request, Response

package = "bilibili_analysis"


@Handler.FrameToFrame
async def analysis_main(request: Request) -> Response:
    text = request.event.msg
    if re.search(r"(b23.tv)|(bili(22|23|33|2233).cn)", text, re.I):
        text = await b23_extract(text)
    msg, vurl = await bili_keyword(request.event.group.qq, text)

    if not vurl:
        return Response(message=msg)
    else:
        return Response(messageList=msg)
