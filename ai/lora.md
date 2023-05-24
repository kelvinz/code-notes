
# caption

1.png
1.txt
	lora_name, describe, describe, describe



# folder

main_folder
	- image
		- 100_lora_name
	- model
	- log

steps aka the num at the start of the folder,
100_lora_name means 100 steps per image in the folder
	- at least 100 per image
	- total at least 1500 steps (aka less than 15 images, the number should be more than 100)



# configs

{
	"max_resolution": "512,512",
	"learning_rate": "0.0001",
	"lr_scheduler": "constant",
	"lr_warmup": "0",
	"train_batch_size": 1,
	"epoch": "1",
	"save_every_n_epochs": "1",
	"mixed_precision": "bf16",
	"save_precision": "bf16",
	"seed": "1234",
	"num_cpu_threads_per_process": 2,
	"cache_latents": true,
	"caption_extension": ".txt",
	"enable_bucket": false,
	"gradient_checkpointing": false,
	"full_fp16": false,
	"no_token_padding": false,
	"stop_text_encoder_training": 0,
	"use_8bit_adam": true,
	"xformers": true,
	"save_model_as": "safetensors",
	"shuffle_caption": false,
	"save_state": false,
	"resume": "",
	"prior_loss_weight": 1.0,
	"text_encoder_lr": "5e-5",
	"unet_lr": "0.0001",
	"network_dim": 128,
	"lora_network_weights": "",
	"color_aug": false,
	"flip_aug": false,
	"clip_skip": 2,
	"gradient_accumulation_steps": 1.0,
	"mem_eff_attn": false,
	"output_name": "Addams",
	"max_token_length": "75",
	"max_train_epochs": "",
	"max_data_loader_n_workers": "1",
	"network_alpha": 128,
	"training_comment": "",
	"keep_tokens": "0",
	"lr_scheduler_num_cycles": "",
	"lr_scheduler_power": ""
}



# extra lora

8 network dimensions
