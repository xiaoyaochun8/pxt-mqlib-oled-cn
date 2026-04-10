/**
 * mqlib blocks
 * 取模工具 https://led.baud-dance.com
 */

//% weight=100 color=#5c2d91 icon=""
//% groups=['oled-汉字库','others']
namespace mqlib {

    /**
     * 在 (x,y) 显示 16×16 汉字
     * x: 0~112   page:0~6
     */
    function showCN16oled(
        x: number,
        page: number,
        ch: string,
        // color: number
    ) {
        const c = findCN16oled(ch);
        if (!c) return;

        oledCmd(0xB0 + page);
        oledCmd(x & 0x0F);
        oledCmd(0x10 | (x >> 4));
        for (let i = 0; i < 16; i++) oledData(c.dot[i]);

        oledCmd(0xB0 + page + 1);
        oledCmd(x & 0x0F);
        oledCmd(0x10 | (x >> 4));
        for (let i = 16; i < 32; i++) oledData(c.dot[i]);
    }

    /**
     * tft显示字符串（多汉字）
     */
    //% subcategory="oled"
    //% group='oled-汉字库'
    //% block="oled屏显示中文 $str 在位置x: $x, y: $y"
    export function oledShowCN(
        x: number,
        y: number,
        str: string,
        // color: number
    ) {
        let cx = x;
        for (const ch of str) {
            showCN16oled(cx, y, ch);
            cx += 16;
        }
    }

    const OLED_ADDR = 0x3C;

    function oledCmd(cmd: number) {
        let buf = Buffer.create(2)
        buf[0] = 0x00
        buf[1] = cmd
        pins.i2cWriteBuffer(OLED_ADDR, buf);
    }

    function oledData(dat: number) {
        let buf = Buffer.create(2)
        buf[0] = 0x40
        buf[1] = dat
        pins.i2cWriteBuffer(OLED_ADDR, buf);
    }

    // OLED 初始化
    //% subcategory="oled"
    //% group='oled-汉字库'
    //% block
    export function oledInit() {
        oledCmd(0xAE);
        oledCmd(0xD5); oledCmd(0x80);
        oledCmd(0xA8); oledCmd(0x3F);
        oledCmd(0xD3); oledCmd(0x00);
        oledCmd(0x40);
        oledCmd(0x8D); oledCmd(0x14);
        oledCmd(0x20); oledCmd(0x00);
        oledCmd(0xA1);
        oledCmd(0xC8);
        oledCmd(0xDA); oledCmd(0x12);
        oledCmd(0x81); oledCmd(0xCF);
        oledCmd(0xD9); oledCmd(0xF1);
        oledCmd(0xDB); oledCmd(0x30);
        oledCmd(0xA4);
        oledCmd(0xA6);
        oledCmd(0xAF);
    }

    // 清屏
    //% subcategory="oled"
    //% group='oled-汉字库'
    //% block
    export function oledClear() {
        for (let p = 0; p < 8; p++) {
            oledCmd(0xB0 + p);
            oledCmd(0x00);
            oledCmd(0x10);
            for (let i = 0; i < 128; i++) oledData(0);
        }
    }
}
