
# Video Lesson

<https://www.youtube.com/watch?v=-JcvdDErkAU>
<https://www.youtube.com/watch?v=AZfkF4OwNfI>



# RVC Web UI

<https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI>



# Realtime Voice Changer

<https://github.com/w-okada/voice-changer>



# Huggingface

<https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main>



# Pixabay

<https://pixabay.com/music/happy-childrens-tunes-ponyo-cliff-cartoon-animation-movie-music-song-1383/>



# Google Collab

<https://colab.research.google.com/github/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/Retrieval_based_Voice_Conversion_WebUI.ipynb>
add => !pip3 install git+https://github.com/JeremyCCHsu/Python-Wrapper-for-World-Vocoder.git
maybe add => !pip3 install cloud-tpu-client



# Notes

*Train*

- Experiment name: *name*
- Target sample rate: 40k
- If the model have pitch... : true
- Model architecture: v2
- Threads: 16
- Path to training folder: *your voice files*
=> process data

- Select pitch extraction: harvest
=> feature extraction

- saving frequency: 10
- total training epochs: 200
- batch size: 40?
- save only latest: yes
- cache all: no
- save small finished: yes
=> one-click training



*Seperation of Accompaniment and Vocal*

- remove input path, use select file from below instead
- hp2 if no harmony, hp5 if with harmony
- change output dir
=> convert



