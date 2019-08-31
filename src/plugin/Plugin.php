<?php

namespace vnh_namespace;

const FRONTEND = PLUGIN_SLUG . '-frontend';
const EDITOR = PLUGIN_SLUG . '-editor';
const BLOCKS = PLUGIN_SLUG . '-style';

final class Plugin extends Core {
	public static function instance($main_plugin_file) {
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self($main_plugin_file);
		}

		return self::$_instance;
	}

	public function register_frontend_assets() {
		return [
			'styles' => [
				FRONTEND => [
					'src' => get_plugin_url(ASSETS_DIR . 'css/frontend.css'),
					'version' => filemtime(get_plugin_path(ASSETS_DIR . 'css/frontend.css')),
				],
				'fancybox' => [
					'src' => get_plugin_url(LIBS_DIR . 'fancybox/jquery.fancybox.min.css'),
				],
			],
			'scripts' => [
				'intersection-observer' => [
					'src' => get_plugin_url(LIBS_DIR . 'intersection-observer/intersection-observer.js'),
				],
				'jarallax' => [
					'src' => get_plugin_url(LIBS_DIR . 'jarallax/jarallax.js'),
					'have_min' => true,
				],
				'jarallax-video' => [
					'src' => get_plugin_url(LIBS_DIR . 'jarallax/jarallax-video.js'),
					'have_min' => true,
				],
				'fancybox' => [
					'src' => get_plugin_url(LIBS_DIR . 'fancybox/jquery.fancybox.min.js'),
					'deps' => ['jquery'],
				],
				FRONTEND => [
					'src' => get_plugin_url(ASSETS_DIR . 'js/dist/frontend.js'),
					'version' => filemtime(get_plugin_path(ASSETS_DIR . 'js/dist/frontend.js')),
				],
			],
		];
	}

	public function register_editor_assets() {
		return [
			'styles' => [
				EDITOR => [
					'src' => get_plugin_url(ASSETS_DIR . 'css/editor.css'),
					'deps' => ['wp-edit-blocks'],
					'version' => filemtime(get_plugin_path(ASSETS_DIR . 'css/editor.css')),
				],
			],
			'scripts' => [
				PLUGIN_SLUG => [
					'src' => get_plugin_url(ASSETS_DIR . 'js/dist/editor.js'),
					'version' => filemtime(get_plugin_path(ASSETS_DIR . 'js/dist/editor.js')),
					'deps' => [
						'lodash',
						'wp-api-fetch',
						'wp-blocks',
						'wp-components',
						'wp-compose',
						'wp-data',
						'wp-edit-post',
						'wp-block-editor',
						'wp-element',
						'wp-hooks',
						'wp-i18n',
						'wp-plugins',
						'wp-api',
					],
					'have_translate' => true,
				],
			],
		];
	}

	public function register_block_assets() {
		return [
			'styles' => [
				BLOCKS => [
					'src' => get_plugin_url(ASSETS_DIR . 'css/style.css'),
					'version' => filemtime(get_plugin_path(ASSETS_DIR . 'css/style.css')),
				],
			],
		];
	}

	public function enqueue_frontend_assets() {
		wp_enqueue_style(FRONTEND);

		wp_enqueue_script('intersection-observer');
		wp_enqueue_script('jarallax');
		wp_enqueue_script('jarallax-video');
		wp_enqueue_script(FRONTEND);
	}

	public function enqueue_editor_assets() {
		wp_dequeue_style('common');
		wp_enqueue_style('common');
		wp_enqueue_style(EDITOR);

		if (function_exists('wp_set_script_translations')) {
			wp_set_script_translations(PLUGIN_SLUG, 'vnh_textdomain');
		}

		wp_enqueue_script(PLUGIN_SLUG);

		wp_localize_script(PLUGIN_SLUG, 'avita', [
			'pluginUrl' => get_plugin_url(),
			'isDev' => is_dev(),
		]);
	}

	public function enqueue_block_assets() {
		wp_enqueue_style(BLOCKS);
	}
}
