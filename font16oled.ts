namespace mqlib {
    // 16x16 汉字点阵结构
    export interface CN16oledChar {
        str: string;       // 汉字
        dot: number[];   // 32 字节点阵
    }

    // 只包含：中、文
    export const CN16oled: CN16oledChar[] = [
        {
            str: "中",
            dot: [
                0x00, 0x00, 0xf0, 0x10, 
                0x10, 0x10, 0x10, 0xff, 
                0x10, 0x10, 0x10, 0x10, 
                0xf0, 0x00, 0x00, 0x00, //前8行（16列）
                0x00, 0x00, 0x0f, 0x04, 
                0x04, 0x04, 0x04, 0xff, 
                0x04, 0x04, 0x04, 0x04, 
                0x0f, 0x00, 0x00, 0x00 //后8行（16列）
            ]
            /*
            0b x 16列 x 2行
            */
        },
        {
            str: "文",
            dot: [
                0xe6, 0x96, 0x87, 0x00, 
                0x08, 0x08, 0x08, 0x38, 
                0xc8, 0x08, 0x09, 0x0e, 
                0x08, 0x08, 0xc8, 0x38, 
                0x08, 0x08, 0x08, 0x00, 
                0x80, 0x80, 0x40, 0x40, 
                0x20, 0x11, 0x0a, 0x04, 
                0x0a, 0x11, 0x20, 0x40, 
                0x40, 0x80, 0x80, 0x00
            ]
        }
    ];

    // 查找汉字
    export function findCN16oled(ch: string): CN16oledChar | null {
        let result = CN16oled.find(item => item.str === ch)
        if (result) {
            return result
        } else {
            return null
        }
    }
}