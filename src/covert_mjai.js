// convert mahjong soul to mjai format
const testLog =
    [
        {
            "name": "ActionNewRound",
            "data": {
                "chang": 0,
                "ju": 1,
                "ben": 0,
                "tiles": [
                    "2m",
                    "2m",
                    "6m",
                    "8m",
                    "5p",
                    "5p",
                    "6p",
                    "2s",
                    "3s",
                    "4s",
                    "6s",
                    "8s",
                    "5z"
                ],
                "scores": [
                    23000,
                    24000,
                    24000,
                    29000
                ],
                "liqibang": 0,
                "al": false,
                "md5": "83e3b0c5236bbccc09fa7866851c7e00",
                "left_tile_count": 69,
                "doras": [
                    "1s"
                ],
                "opens": [
                    {
                        "seat": 0
                    },
                    {
                        "seat": 1
                    },
                    {
                        "seat": 2
                    },
                    {
                        "seat": 3
                    }
                ]
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "2z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 68,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "9s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 67,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "2z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "1p",
                "left_tile_count": 66,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "5z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 65,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "5z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 64,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "4z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 63,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "1z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "5z",
                "left_tile_count": 62,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "1p",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 61,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "1s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 60,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "8m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 59,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "1p",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "7p",
                "left_tile_count": 58,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "5z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 57,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "7m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 56,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "1s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 55,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "4m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "7z",
                "left_tile_count": 54,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "7z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 53,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "4z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 52,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "8p",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 51,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "1m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "2p",
                "left_tile_count": 50,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "2p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 49,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "2z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 48,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "6p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 47,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "3s",
                "is_liqi": false,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 2,
                            "combination": [
                                "2s|4s"
                            ]
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "6s",
                "left_tile_count": 46,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "6p",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionChiPengGang",
            "data": {
                "seat": 1,
                "type": 0,
                "tiles": [
                    "7p",
                    "8p",
                    "6p"
                ],
                "froms": [
                    1,
                    1,
                    0
                ],
                "zhenting": false,
                "tile_states": [
                    0,
                    0
                ]
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "1m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 45,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "1s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 44,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "9p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "6m",
                "left_tile_count": 43,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "8s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 42,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "7z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 41,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "8s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 40,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "1z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "9m",
                "left_tile_count": 39,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "7p",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 38,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "5m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 37,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "2p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 36,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "4s",
                "is_liqi": false,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 2,
                            "combination": [
                                "2s|3s"
                            ]
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "6m",
                "left_tile_count": 35,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "9m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 34,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "2s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 33,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "4m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 32,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "9p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "6p",
                "left_tile_count": 31,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "8m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 30,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "9s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 29,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "7z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 28,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "4p",
                "is_liqi": false,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 2,
                            "combination": [
                                "5p|6p"
                            ]
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "4s",
                "left_tile_count": 27,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "3s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 26,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "7s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 25,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "1p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 24,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "1m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "3m",
                "left_tile_count": 23,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "2s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 22,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "6z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 21,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "3m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 20,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "3s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "2m",
                "left_tile_count": 19,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "3m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 18,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "1z",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 17,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "1z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 16,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "3z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "8s",
                "left_tile_count": 15,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "8s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 14,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "0m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 13,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "3m",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 12,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "6m",
                "is_liqi": false,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 3,
                            "combination": [
                                "6m|6m"
                            ]
                        },
                        {
                            "type": 5,
                            "combination": [
                                "6m|6m|6m"
                            ]
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionChiPengGang",
            "data": {
                "seat": 0,
                "type": 2,
                "tiles": [
                    "6m",
                    "6m",
                    "6m",
                    "6m"
                ],
                "froms": [
                    0,
                    0,
                    0,
                    3
                ],
                "zhenting": false,
                "tile_states": [
                    0,
                    0,
                    0
                ]
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "9s",
                "left_tile_count": 11,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "doras": [
                    "1s"
                ],
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "9s",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "doras": [
                    "1s",
                    "4z"
                ],
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 10,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "7z",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 9,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "1m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 8,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "5m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "8m",
                "left_tile_count": 7,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "8m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 6,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 1,
                "tile": "4m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 2,
                "left_tile_count": 5,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 2,
                "tile": "3s",
                "is_liqi": false,
                "moqie": false,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 3,
                "left_tile_count": 4,
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 3,
                "tile": "8p",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "2m",
                "left_tile_count": 3,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        },
                        {
                            "type": 4,
                            "combination": [
                                "2m|2m|2m|2m"
                            ]
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "zhenting": false
            }
        },
        {
            "name": "ActionAnGangAddGang",
            "data": {
                "seat": 0,
                "type": 3,
                "tiles": "2m",
                "zhenting": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 0,
                "tile": "3m",
                "left_tile_count": 2,
                "operation": {
                    "seat": 0,
                    "operation_list": [
                        {
                            "type": 1
                        }
                    ],
                    "time_add": 0,
                    "time_fixed": 300000
                },
                "doras": [
                    "1s",
                    "4z",
                    "3p"
                ],
                "zhenting": false
            }
        },
        {
            "name": "ActionDiscardTile",
            "data": {
                "seat": 0,
                "tile": "3m",
                "is_liqi": false,
                "moqie": true,
                "zhenting": false,
                "is_wliqi": false
            }
        },
        {
            "name": "ActionDealTile",
            "data": {
                "seat": 1,
                "left_tile_count": 1,
                "zhenting": false
            }
        }
    ]
// convert tenhou tile to mjai format
const tenhouTile2MjaiTile = (tile) => {
    const tileMap = {
        '0s': '5sr',
        '0m': '5mr',
        '0p': '5pr',
        '1z': 'E',
        '2z': 'S',
        '3z': 'W',
        '4z': 'N',
        '5z': 'P',
        '6z': 'F',
        '7z': 'C',
    }
    return tileMap[tile] ? tileMap[tile] : tile;
}

const testData = [
    // 加杠
    {
        "name": "ActionAnGangAddGang",
        "data": {
            "seat": 0,
            "type": 2,
            "tiles": "2z",
            "zhenting": false
        },
    },
    // 碰
    {
        "name": "ActionChiPengGang",
        "data": {
            "seat": 0,
            "type": 1,
            "tiles": [
                "2z",
                "2z",
                "2z"
            ],
            "froms": [
                0,
                0,
                2
            ],
            "operation": {
                "seat": 0,
                "operation_list": [
                    {
                        "type": 1,
                        "combination": [
                            "2z"
                        ]
                    }
                ],
                "time_add": 0,
                "time_fixed": 300000
            },
            "zhenting": false,
            "tile_states": [
                0,
                0
            ]
        }
    },
    // 别人拿到牌
    {
        "name": "ActionDealTile",
        "data": {
            "seat": 2,
            "left_tile_count": 62,
            "zhenting": false
        }
    },
    // 自己拿到牌
    {
        "name": "ActionDealTile",
        "data": {
            "seat": 0,
            "tile": "7z",
            "left_tile_count": 64,
            "operation": {
                "seat": 0,
                "operation_list": [
                    {
                        "type": 1
                    }
                ],
                "time_add": 0,
                "time_fixed": 300000
            },
            "zhenting": false
        }
    },
    // 手切牌
    {
        "name": "ActionDiscardTile",
        "data": {
            "seat": 0,
            "tile": "2m",
            "is_liqi": false,
            "moqie": false,
            "zhenting": false,
            "is_wliqi": false
        }
    },
    // 吃
    {
        "name": "ActionChiPengGang",
        "data": {
            "seat": 0,
            "type": 0,
            "tiles": [
                "7p",
                "8p",
                "6p"
            ],
            "froms": [
                0,
                0,
                3
            ],
            "operation": {
                "seat": 0,
                "operation_list": [
                    {
                        "type": 1,
                        "combination": [
                            "6p",
                            "9p"
                        ]
                    }
                ],
                "time_add": 0,
                "time_fixed": 300000
            },
            "zhenting": false,
            "tile_states": [
                0,
                0
            ]
        }
    },
    // 立直
    {
        "name": "ActionDiscardTile",
        "data": {
            "seat": 0,
            "tile": "2m",
            "is_liqi": true,
            "moqie": false,
            "zhenting": false,
            "tingpais": [
                {
                    "tile": "2s",
                    "haveyi": true,
                    "yiman": false,
                    "count": 5,
                    "fu": 50,
                    "biao_dora_count": 0,
                    "yiman_zimo": true,
                    "count_zimo": 1,
                    "fu_zimo": 40
                },
                {
                    "tile": "1p",
                    "haveyi": true,
                    "yiman": false,
                    "count": 5,
                    "fu": 50,
                    "biao_dora_count": 0,
                    "yiman_zimo": true,
                    "count_zimo": 1,
                    "fu_zimo": 50
                }
            ],
            "is_wliqi": false
        }
    },
    // 加杠后dora
    {
        "name": "ActionDiscardTile",
        "data": {
            "seat": 0,
            "tile": "9s",
            "is_liqi": false,
            "moqie": true,
            "zhenting": false,
            "doras": [
                "1s",
                "4z"
            ],
            "is_wliqi": false
        }
    },
    // 暗杠
    {
        "name": "ActionAnGangAddGang",
        "data": {
            "seat": 0,
            "type": 3,
            "tiles": "2m",
            "zhenting": false
        }
    },
    // 暗杠后dora
    {
        "name": "ActionDealTile",
        "data": {
            "seat": 0,
            "tile": "3m",
            "left_tile_count": 2,
            "operation": {
                "seat": 0,
                "operation_list": [
                    {
                        "type": 1
                    }
                ],
                "time_add": 0,
                "time_fixed": 300000
            },
            "doras": [
                "1s",
                "4z",
                "3p"
            ],
            "zhenting": false
        }
    },
    // 开局
    {
        "name": "ActionNewRound",
        "data": {
            "chang": 0,
            "ju": 1,
            "ben": 0,
            "tiles": [
                "2m",
                "2m",
                "6m",
                "8m",
                "5p",
                "5p",
                "6p",
                "2s",
                "3s",
                "4s",
                "6s",
                "8s",
                "5z"
            ],
            "scores": [
                23000,
                24000,
                24000,
                29000
            ],
            "liqibang": 0,
            "al": false,
            "md5": "83e3b0c5236bbccc09fa7866851c7e00",
            "left_tile_count": 69,
            "doras": [
                "1s"
            ],
            "opens": [
                {
                    "seat": 0
                },
                {
                    "seat": 1
                },
                {
                    "seat": 2
                },
                {
                    "seat": 3
                }
            ]
        }
    }

]


const testData2 = [{
    type: 1, dora: true, index: 5,
}, {
    type: 2, dora: false, index: 1,
}, {
    type: 3, dora: false, index: 6
}

]


function getPlayer(index) {
    return view.DesktopMgr.Inst.players[index];
}

function getMyPlayerData() {
    return getPlayer(0);
}

class TileType {
    // 筒子
    static P = new TileType(0, "p");
    // 万字
    static M = new TileType(1, "m");
    // 索子
    static S = new TileType(2, "s");
    // 字牌
    static Z = new TileType(3, "");

    constructor(type, suffix) {
        this.type = type;
        this.suffix = suffix;
    }
}

// type 0: 筒子, 1: 万字, 2: 索子, 3: 字牌
const tileTypeArray = [TileType.P, TileType.M, TileType.S, TileType.Z];
// 1东，2南，3西，4北， 5 白， 6发， 7中
const zipai = ["", "E", "S", "W", "N", "P", "F", "C"];

// map mahjong soul tile type to mjai tile type
function mapToMjaiTile(tile) {
    const type = tileTypeArray[tile.type];
    switch (type) {
        case TileType.Z:
            return zipai[tile.index];
        default:
            return tile.index + type.suffix + (tile.dora && tile.index == 5 ? "r" : "");
    }
}

function tsumo(actor, tile) {
    return {
        actor: actor,
        pai: tile,
        type: "tsumo",
    }
}

function dapai(actor, tile, tsumogiri) {
    return {
        actor: actor,
        pai: tile,
        tsumogiri: tsumogiri,
        type: "dahai",
    }
}


function pon(actor, target, tile, consumed) {
    return {
        actor: actor,
        target: target,
        pai: tile,
        consumed: consumed,
        type: "pon",
    }
}

function chi(actor, target, tile, consumed) {
    return {
        actor: actor,
        target: target,
        pai: tile,
        consumed: consumed,
        type: "chi",
    }
}

function kakan(actor, tile, consumed) {
    return {
        actor: actor,
        pai: tile,
        consumed: consumed,
        type: "kakan",
    }
}

function daiminkan(actor, target, tile, consumed) {
    return {
        actor: actor,
        target: target,
        pai: tile,
        consumed: consumed,
        type: "daiminkan",
    }
}

function ankan(actor, consumed) {
    return {
        actor: actor,
        consumed: consumed,
        type: "ankan",
    }
}

function reach(actor) {
    return {
        actor: actor,
        type: "reach",
    }
}

function reachAccepted(actor) {
    return {
        actor: actor,
        type: "reach_accepted",
    }
}

function dora_maker(tile) {
    return {
        type: "dora",
        dora_maker: tile,
    }
}

function start_kyoku(bakaze, kyoku, honba, kyotaku, oya, dora_marker, scores, tehais) {
    return {
        type: "start_kyoku",
        // 场风
        bakaze: bakaze,
        // 局
        kyoku: kyoku,
        // 本场
        honba: honba,
        // 供脱
        kyotaku: kyotaku,
        // 庄家
        oya: oya,
        dora_marker: dora_marker,
        scores: scores,
        tehais: tehais,
    }
}


function action2Mjai(action) {
    const name = action.name;
    const data = action.data;
    const mySeat = typeof view == 'undefined' ? 0 : view.DesktopMgr.Inst.seat;
    const res = []
    const bakazeList = ["E", "S", "W", "N"];
    switch (name) {
        case 'ActionNewRound':
            const tehais = []
            for (let i = 0; i < data.opens.length; i++) {
                if (mySeat == i) {
                    tehais.push(data.tiles.slice(0, 13).map(tenhouTile2MjaiTile));
                } else {
                    // get a 13 length array with all 0
                    if (data.ju != i) {
                        tehais.push(new Array(13).fill('?'));
                    } else {
                        tehais.push(new Array(14).fill('?'));
                    }
                    // tehais.push(Array.fill(13, "?"));
                }
            }
            res.push(start_kyoku(bakazeList[data.chang], data.ju + 1, data.ben, data.liqibang, data.ju, tenhouTile2MjaiTile(data.doras[0]),
                data.scores, tehais))
            if (mySeat == data.ju) {
                res.push(tsumo(data.ju, tenhouTile2MjaiTile(data.tiles[13])))
            }
            break;

        case 'ActionDiscardTile':

            if (data.is_liqi) {
                res.push(reach(data.seat), dapai(data.seat, tenhouTile2MjaiTile(data.tile), data.moqie), reachAccepted(data.seat))
            }
            res.push(dapai(data.seat, tenhouTile2MjaiTile(data.tile), data.moqie));
            if (data.doras) {
                res.push(dora_maker(tenhouTile2MjaiTile(data.doras[data.doras.length - 1])));
            }
            break;

        case 'ActionDealTile':
            if (data.doras) {
                res.push(dora_maker(tenhouTile2MjaiTile(data.doras[data.doras.length - 1])));
            }
            if (data.tile) {
                res.push(tsumo(data.seat, tenhouTile2MjaiTile(data.tile)));
            }
            break;
        case 'ActionChiPengGang':
            const diffSeatIndex = data.froms.map((_, index) => index).filter((index) => data.froms[index] != data.seat)[0];
            const from = data.froms[diffSeatIndex];
            const pai = data.tiles[diffSeatIndex];
            if (data.type == 0) {
                res.push(chi(data.seat, from, tenhouTile2MjaiTile(pai), data.tiles.map(tenhouTile2MjaiTile)));
            } else if (data.type == 1) {
                res.push(pon(data.seat, from, tenhouTile2MjaiTile(pai), data.tiles.map(tenhouTile2MjaiTile)));
            } else if (data.type == 2) {
                res.push(daiminkan(data.seat, from, tenhouTile2MjaiTile(pai), data.tiles.map(tenhouTile2MjaiTile)));
            }

            break;

        case 'ActionAnGangAddGang':
            let consumed = [];
            let tile = data.tiles;
            if (tile == '0m') {
                consumed = ['5m', '5m', '5m']
            } else if (tile == '0p') {
                consumed = ['5p', '5p', '5p']
            } else if (tile == '0s') {
                consumed = ['5s', '5s', '5s']
            } else if (tile == '5m') {
                consumed = ['0m', '5m', '5m']
            } else if (tile == '5p') {
                consumed = ['0p', '5p', '5p']
            } else if (tile == '5s') {
                consumed = ['0s', '5s', '5s']
            } else {
                consumed = [tile, tile, tile]
            }
            if (data.type == 3) {
                res.push(ankan(data.seat, consumed.map(tenhouTile2MjaiTile)));
            } else if (data.type == 2) {
                // 加杠
                res.push(kakan(data.seat, tenhouTile2MjaiTile(tile), consumed.map(tenhouTile2MjaiTile)));
            }
            break;
    }
    return res;
}

function convertActions2Log(actions) {
    const log = [];
    // let nextDoraIndex = 1;
    // let isKaikan = false;
    // console.log(actions)
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const mjaiAction = action2Mjai(action);
        // if (mjaiAction) {
        log.push(...mjaiAction);
        // if (Array.isArray(mjaiAction)) {
        //     log.push(...mjaiAction);
        // } else {
        // log.push(mjaiAction);
        // if (mjaiAction.type == 'kakan' || mjaiAction.type == 'daiminkan') {
        //     isKaikan = true;
        // }
        // if (mjaiAction.type == 'ankan') {
        //     log.push(dora_maker(dora[nextDoraIndex++]));
        // }
        // // 打完牌后，如果开杠了，显示宝牌
        // if (isKaikan && mjaiAction.type == 'dahai') {
        //     log.push(dora_maker(dora[nextDoraIndex++]));
        //     isKaikan = false;
        // }
        // }
        // }
    }
    return log;
}

console.log(testData2.map(tile => mapToMjaiTile(tile)));
console.log(JSON.stringify(convertActions2Log(testLog)));

function convertToMjai() {
    const myData = getMyPlayerData();
    const myHand = myData.hand;

}

