export default class AudioManager {
  constructor() {
    this.sounds = [];
    this.music = [];
  }

  addSounds(list) {
    list.forEach((el) => {
      if (!el.hasOwnProperty("name")) {
        return "No Sound Name provided";
      }
      this.sounds.push(el);
    });
  }

  play(name) {
    if (typeof name !== "string") {
      return;
    }

    const sound =
      this.sounds.filter((el) => el?.name === name)?.[0] ||
      "No Sound was found!";

    if (sound) {
      sound?.audio.play();
    }
  }

  pause(name) {}
}
