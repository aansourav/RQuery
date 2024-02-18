const nestedObject = {
    level1: {
        prop1: "Level 1 Property 1",
        level2: {
            prop1: "Level 2 Property 1",
            level3: {
                prop1: "Level 3 Property 1",
                level4: {
                    prop1: "Level 4 Property 1"
                }
            }
        }
    }
};

const nestedArray = [
    [
        [
            [
                [1, 2],
                [3, 4]
            ],
            [
                [5, 6],
                [7, 8]
            ]
        ],
        [
            [
                [9, 10],
                [11, 12]
            ],
            [
                [13, 14],
                [15, 16]
            ]
        ]
    ],
    [
        [
            [
                [17, 18],
                [19, 20]
            ],
            [
                [21, 22],
                [23, 24]
            ]
        ],
        [
            [
                [25, 26],
                [27, 28]
            ],
            [
                [29, 30],
                [31, 32]
            ]
        ]
    ]
];


const deepCloneObj = JSON.parse(JSON.stringify(nestedObject))
const deepCloneArr = JSON.parse(JSON.stringify(nestedArray))

console.log(deepCloneArr);