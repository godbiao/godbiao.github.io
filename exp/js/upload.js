			var expu;
			var expu_gif;
			var preu;

			window.onload = function () {

				var settings = {
					flash_url: "swfupload/swfupload.swf",
					flash9_url: "swfupload/swfupload_fp9.swf",
					upload_url: "upload.php",
					//				post_params: {
					//					"PHPSESSID": "<?php echo session_id(); ?>"
					//				},
					file_size_limit: "200 KB",
					file_types: "*.png",
					file_types_description: "选择图片",
					file_upload_limit: 0,
					file_queue_limit: 32,
					custom_settings: {
						progressTarget: "fsUploadProgress",
						cancelButtonId: "btnCancel"
					},
					debug: false,

					// Button settings
					button_image_url: "images/TestImageNoText_65x29.png",
					button_width: "65",
					button_height: "29",
					button_placeholder_id: "spanButtonPlaceHolder",
					button_text: '<span class="theFont">选择</span>',
					button_text_style: ".theFont {font-size: 12;color:#ffffff;cursor: pointer;}",
					button_text_left_padding: 18,
					button_text_top_padding: 5,

					// The event handler functions are defined in handlers.js
					swfupload_preload_handler: preLoad,
					swfupload_load_failed_handler: loadFailed,
					file_queued_handler: fileQueued,
					file_queue_error_handler: fileQueueError,
					file_dialog_complete_handler: fileDialogComplete,
					upload_start_handler: uploadStart,
					upload_progress_handler: uploadProgress,
					upload_error_handler: uploadError,
					upload_success_handler: uploadSuccess,
					upload_complete_handler: uploadComplete,
					queue_complete_handler: queueComplete, // Queue plugin event					
					//file_dialog_start_handler: fileDialogStart
				};

				var settings_gif = {
					flash_url: "swfupload/swfupload.swf",
					flash9_url: "swfupload/swfupload_fp9.swf",
					upload_url: "upload.php",
					//				post_params: {
					//					"PHPSESSID": "<?php echo session_id(); ?>"
					//				},
					file_size_limit: "600 KB",
					file_types: "*.png;*.gif",
					file_types_description: "选择图片",
					file_upload_limit: 0,
					file_queue_limit: 64,
					custom_settings: {
						progressTarget: "fsUploadProgress_gif",
						cancelButtonId: "btnCancel_gif"
					},
					debug: false,

					// Button settings
					button_image_url: "images/TestImageNoText_65x29.png",
					button_width: "65",
					button_height: "29",
					button_placeholder_id: "spanButtonPlaceHolder_gif",
					button_text: '<span class="theFont">选择</span>',
					button_text_style: ".theFont { font-size: 12; color:#ffffff; }",
					button_text_left_padding: 18,
					button_text_top_padding: 5,

					// The event handler functions are defined in handlers.js
					swfupload_preload_handler: preLoad,
					swfupload_load_failed_handler: loadFailed,
					file_queued_handler: fileQueued,
					file_queue_error_handler: fileQueueError,
					file_dialog_complete_handler: fileDialogComplete,
					upload_start_handler: uploadStart,
					upload_progress_handler: uploadProgress,
					upload_error_handler: uploadError,
					upload_success_handler: uploadSuccess,
					upload_complete_handler: uploadComplete,
					queue_complete_handler: queueComplete_gif, // Queue plugin event					
					//file_dialog_start_handler: fileDialogStart
				};


				var settings_pre = {
					flash_url: "swfupload/swfupload.swf",
					flash9_url: "swfupload/swfupload_fp9.swf",
					upload_url: "upload_pre.php",
					//post_params: {
					//"PHPSESSID": "<?php echo session_id(''); ?>"
					//},
					file_size_limit: "50 KB",
					file_types: "*.png",
					file_types_description: "选择图片",
					file_upload_limit: 0,
					file_queue_limit: 1,
					custom_settings: {
						progressTarget: "fsUploadProgress_pre",
						cancelButtonId: "btnCancel_pre"
					},
					debug: false,

					// Button settings
					button_image_url: "images/TestImageNoText_65x29.png",
					button_width: "65",
					button_height: "29",
					button_placeholder_id: "spanButtonPlaceHolder_pre",
					button_text: '<span class="theFont">选择</span>',
					button_text_style: ".theFont { font-size: 12; color:#ffffff; }",
					button_text_left_padding: 18,
					button_text_top_padding: 5,

					// The event handler functions are defined in handlers.js
					swfupload_preload_handler: preLoad,
					swfupload_load_failed_handler: loadFailed,
					file_queued_handler: fileQueued,
					file_queue_error_handler: fileQueueError_pre,
					file_dialog_complete_handler: fileDialogComplete,
					upload_start_handler: uploadStart,
					upload_progress_handler: uploadProgress,
					upload_error_handler: uploadError,
					upload_success_handler: uploadSuccess,
					upload_complete_handler: uploadComplete,
					queue_complete_handler: queueComplete_pre, // Queue plugin event					
					//file_dialog_start_handler: fileDialogStart
				};

				expu = new SWFUpload(settings);
				expu_gif = new SWFUpload(settings_gif);
				preu = new SWFUpload(settings_pre);

				var staticpng = document.getElementById("staticpng");
				var dynamicgif = document.getElementById("dynamicgif");
				var uploadform = document.getElementById("uploadform");
				var uploadform_gif = document.getElementById("uploadform_gif");

				staticpng.onclick = function () {
					uploadform.style.display = "block";
					uploadform_gif.style.display = "none";
				};

				dynamicgif.onclick = function () {
					uploadform_gif.style.display = "block";
					uploadform.style.display = "none";

				};

			};