import { Avatar } from "../avatar/avatarModule";
import { GlobalOptions } from "../global/globalModule";

export function buildAvatarCss({
  discordId,
  idleImageUrl,
  speakingImageUrl,
  order,
}: Avatar) {
  return `
/** Avatar ${order} **/

.voice-container
  .voice-states
  .voice-state[data-reactid*="${discordId}"] {
  display: initial;
  /** Note that the orders are reversed - this will ensure that your own avatar
      is displayed closer to the corner of the stream. */
  order: ${order};
}

.voice-container
  .voice-states
  .voice-state[data-reactid*="${discordId}"]
  .avatar {
  content: url(${idleImageUrl});
}

.voice-container
  .voice-states
  .voice-state[data-reactid*="${discordId}"]
  .speaking {
  content: url(${speakingImageUrl});
}
  `;
}

export function buildGlobalCss({
  avatarBounce,
  avatarEnthusiasm,
  avatarIdleBrightness,
  avatarOverscan,
  avatarSeparation,
  avatarWidth,
}: GlobalOptions) {
  return `
:root {
  /* Sets the width of each avatar. Height will be set according to the aspect ratio of the image. Default 250px. */
  --avatar-width: ${avatarWidth};

  /* Controls how much of the avatar will be positioned offscreen to avoid clipping issues
     when the user speaks. Default 10px. */
  --avatar-overscan-y: ${avatarOverscan};

  /* Controls the maximum bounce height. Should probably be set to the same value as
     avatar-overscan-y. Default 10px. */
  --avatar-bounce-y: ${avatarBounce};

  /* Controls the speed of the bounce animation. Default 1s. */
  --avatar-bounce-enthusiasm: ${avatarEnthusiasm};

  /* Avatar idle brightness. Set this to 100% if you don't want the avatar to dim when idle. Default 75%. */
  --avatar-idle-brightness: ${avatarIdleBrightness};

  /* Avatar separation. This controls how closely multiple avatars will be grouped together. Default 0px.
     NOTE: Negative values can be used to overlap avatars - play with the order and z-index on individual
     avatars to tweak the layering to your satisfaction. */
  --avatar-separation: ${avatarSeparation};
}

.user {
  display: none;
}

.voice-container .voice-states .voice-state {
  display: none;
  height: auto;
  padding: 0;
  margin: 0;
}

.voice-container .voice-states .voice-state .avatar,
.voice-container .voice-states .voice-state .speaking {
  position: relative;
  border: 0;
  border-radius: 0%;
  width: var(--avatar-width);
  height: 100%;
  margin: 0;
  padding: 0;
}

.voice-container .voice-states .voice-state .avatar {
  filter: brightness(var(--avatar-idle-brightness));
}

.voice-container .voice-states .voice-state .speaking {
  animation-name: bounce;
  animation-duration: var(--avatar-bounce-enthusiasm);
  animation-fill-mode: forwards;
  filter: brightness(100%);
}

/* The avatar container - you can fiddle with the position offsets to change where it anchors within the webview */
.voice-container {
  position: fixed;
  bottom: calc(var(--avatar-overscan-y) * -1);
  right: 0;
  margin: 0;
  padding: 0;
}

.voice-container .voice-states {
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
}

.voice-container .voice-states .voice-state {
  margin-right: var(--avatar-separation);
}

.voice-container .voice-states .voice-state:last-child {
  margin-right: 0;
}

@keyframes bounce {
  0% {
    bottom: 0px;
  }
  15% {
    bottom: var(--avatar-bounce-y);
  }
  30% {
    bottom: 0px;
  }
}

body {
  background-color: rgba(0, 0, 0, 0);
  margin: 0px auto;
  padding: 0;
  overflow: hidden;
}
  `;
}

export function buildCss(globalOptions: GlobalOptions, avatars: Avatar[] = []) {
  const globalCss = buildGlobalCss(globalOptions);
  const avatarCss = avatars.map(buildAvatarCss).join("\n\n");

  return `
/***********************************
 *
 * Global configuration
 *
 ***********************************/

${globalCss}

/***********************************
 *
 * Avatar configuration
 *
 ***********************************/

${avatarCss}
  `;
}
