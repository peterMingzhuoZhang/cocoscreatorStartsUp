import { _decorator, assetManager, AudioClip, Component, ImageAsset, Node, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

export class RemoteLoader {
    /**
     * 是否处于微信小游戏环境
     */
    private static isWX(): boolean {
        return typeof wx !== 'undefined' && wx.downloadFile !== undefined;
    }

    /**
     * 加载远程 SpriteFrame（支持微信平台）
     */
    public static async loadRemoteSpriteFrame(url: string): Promise<SpriteFrame> {
        const image = await this.loadRemoteImage(url);
        const texture = new Texture2D();
        texture.image = image;

        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = texture;
        return spriteFrame;
    }

    /**
     * 加载远程图片为 ImageAsset
     */
    public static loadRemoteImage(url: string): Promise<ImageAsset> {
        return new Promise((resolve, reject) => {
            if (this.isWX()) {
                wx.downloadFile({
                    url,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            assetManager.loadRemote(res.tempFilePath, { ext: '.png' }, (err, asset: ImageAsset) => {
                                if (err) reject(err);
                                else resolve(asset);
                            });
                        } else {
                            reject(new Error('下载失败：' + res.statusCode));
                        }
                    },
                    fail: reject
                });
            } else {
                assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, (err, asset) => {
                    if (err) reject(err);
                    else resolve(asset);
                });
            }
        });
    }

    /**
     * 加载远程音频（AudioClip）
     */
    public static loadRemoteAudio(url: string): Promise<AudioClip> {
        return new Promise((resolve, reject) => {
            if (this.isWX()) {
                wx.downloadFile({
                    url,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            assetManager.loadRemote(res.tempFilePath, { ext: '.mp3' }, (err, asset: AudioClip) => {
                                if (err) reject(err);
                                else resolve(asset);
                            });
                        } else {
                            reject(new Error('下载失败：' + res.statusCode));
                        }
                    },
                    fail: reject
                });
            } else {
                assetManager.loadRemote<AudioClip>(url, { ext: '.mp3' }, (err, asset) => {
                    if (err) reject(err);
                    else resolve(asset);
                });
            }
        });
    }
}


