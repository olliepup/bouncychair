import { Avatar } from "../avatar/avatarModule";
import { GlobalOptions } from "../global/globalModule";
import { buildCss } from "./buildCss";

export function buildAvatarHtml({ discordId }: Avatar) {
  return `
<li
  class="voice-state"
  data-reactid=".0.0.0.$${discordId}/=1$${discordId}"
  onmouseenter="setSpeaking(this, true)"
  onmouseleave="setSpeaking(this, false)"
>
  <img
    class="avatar"
    src=""
    data-reactid=".0.0.0.$${discordId}/=1$${discordId}.$=10"
  />
  <div
    class="user"
    data-reactid=".0.0.0.$${discordId}/=1$${discordId}.$/=11"
  >
    <span
      class="name"
      style="
        color: #ffffff;
        font-size: 14px;
        background-color: rgba(30, 33, 36, 0.95);
      "
      data-reactid=".0.0.0.$${discordId}/=1$${discordId}.$/=11.0"
      >Example User</span
    >
  </div>
</li>
  `;
}

export function buildPreviewHtml(
  globalOptions: GlobalOptions,
  avatars: Avatar[] = []
) {
  const css = buildCss(globalOptions, avatars);

  const avatarHtml = avatars.map(buildAvatarHtml).join("\n\n");

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Discord StreamKit Overlay</title>
    <style type="text/css">${css}</style>
    <style type="text/css">
      body {
        background: rgba(221, 214, 254, 1);
        font-family: sans-serif;
      }

      .previewTextContainer {
        display: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .previewText h1 {
        font-size: 72px;
        line-height: 0;
        color: rgba(0,0,0,.2);
      }

      .previewText h4 {
        font-size: 24px;
        color: rgba(0,0,0,.2);
      }
    </style>
  </head>
  <body style="margin: 0">
    <div class="previewTextContainer">
      <div class="previewText">
        <h1>Preview</h1>
        <h4>Tip: Mouse over avatars to simulate speaking!</h4>
      
      </div>
    </div>
    <div id="app-mount">
      <div
        style="font-family: Whitney, sans-serif; background-color: transparent"
        class=" "
        data-reactid=".0"
      >
        <div class="voice-container" data-reactid=".0.0">
          <ul class="voice-states" data-reactid=".0.0.0">
            ${avatarHtml}
          </ul>
        </div>
      </div>
    </div>
  </body>
  <script type="text/javascript">
    function setSpeaking(el, isSpeaking) {
      const avatar = el.querySelector('.avatar');

      if (!avatar) {
        return;
      }

      if (isSpeaking) {
        avatar.classList.add('speaking');
      } else {
        avatar.classList.remove('speaking');
      }
    }
  </script>
</html>
`;
}
