(func (;3341;) (type 0) (param i32 i32)
(local i32 i32 i32 i32 i32 i32 i64)
global.get 0
i32.const 6656
i32.sub
local.tee 3
global.set 0
local.get 1
i32.const 0
i32.store8 offset=47925
block  ;; label = @1
block  ;; label = @2
block  ;; label = @3
block  ;; label = @4
block  ;; label = @5
block  ;; label = @6
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 4
i32.lt_u
if  ;; label = @7
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
local.tee 2
i32.load offset=37976
local.tee 4
i32.const -1
i32.eq
local.get 4
i32.eqz
i32.or
i32.eqz
if  ;; label = @8
local.get 2
i32.load offset=37980
local.get 4
call 42646
end
local.get 2
i32.const -1
i32.store offset=37976
block  ;; label = @8
block  ;; label = @9
block  ;; label = @10
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 4
i32.lt_u
if  ;; label = @11
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
local.tee 2
i32.load offset=36976
local.tee 4
i32.const -1
i32.eq
local.get 4
i32.eqz
i32.or
i32.eqz
if  ;; label = @12
local.get 2
i32.load offset=36980
local.get 4
call 42646
end
local.get 2
i32.const 0
i32.store8 offset=36996
local.get 2
i32.const -1
i32.store offset=36976
local.get 1
i32.load offset=47184
local.set 2
local.get 1
i32.const -1
i32.store offset=47184
local.get 2
i32.const 1
i32.add
br_table 3 (;@8;) 2 (;@9;) 1 (;@10;)
end
local.get 2
local.get 4
i32.const 4710664
call 43764
unreachable
end
local.get 1
i32.load offset=47188
local.get 2
i32.const 3
i32.shl
call 42646
end
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 4
i32.ge_u
br_if 2 (;@6;)
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
i64.const 0
i64.const 0
call 14030
end
local.get 1
i32.load offset=1176
i32.const -1
i32.ne
br_if 2 (;@5;)
block  ;; label = @8
local.get 1
i32.load offset=1104
i32.const -1
i32.eq
if  ;; label = @9
local.get 1
i32.const 35304
i32.add
local.set 4
local.get 1
i32.load offset=35496
if  ;; label = @10
local.get 4
call 31249
br 8 (;@2;)
end
local.get 1
i32.load8_u offset=35545
i32.const 1
i32.ne
br_if 1 (;@8;)
local.get 4
call 31249
local.get 1
i32.const -1
i32.store offset=35456
local.get 1
i32.const 0
i32.store8 offset=35545
br 7 (;@2;)
end
local.get 1
i32.const 0
call 1927
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 7 (;@1;)
end
local.get 1
i32.load offset=35776
local.set 2
local.get 1
i32.const -1
i32.store offset=35776
local.get 2
i32.const -1
i32.ne
if  ;; label = @8
local.get 2
i32.const 0
i32.le_s
br_if 6 (;@2;)
local.get 1
i32.load offset=35780
local.get 2
call 42646
br 6 (;@2;)
end
block  ;; label = @8
local.get 1
i32.load offset=36156
local.tee 2
i32.const -1
i32.eq
br_if 0 (;@8;)
local.get 1
i32.load offset=36164
i32.const 8
i32.ne
br_if 0 (;@8;)
local.get 1
i32.load offset=36160
local.tee 5
i64.load align=1
i32.const 9002960
i64.load align=1
i64.ne
br_if 0 (;@8;)
local.get 2
if  ;; label = @9
local.get 5
local.get 2
call 42646
end
local.get 1
i32.const -1
i32.store offset=36156
local.get 1
i32.load offset=36168
local.tee 2
i32.const -1
i32.eq
local.get 2
i32.eqz
i32.or
i32.eqz
if  ;; label = @9
local.get 1
i32.load offset=36172
local.get 2
call 42646
end
local.get 1
i32.const 0
i32.store offset=35912
local.get 1
i32.const -1
i32.store offset=36168
local.get 1
i32.const 0
i32.store16 offset=35440
local.get 1
i32.const -1
i32.store offset=35416
br 6 (;@2;)
end
local.get 4
call 18428
br_if 5 (;@2;)
local.get 4
call 41696
br_if 5 (;@2;)
block  ;; label = @8
local.get 1
call 45623
i32.eqz
if  ;; label = @9
local.get 1
i32.const 0
i32.store offset=43376
local.get 1
i32.const 29712
i32.add
call 40202
local.get 1
i32.const -1
i32.store offset=27144
local.get 1
i64.load offset=5760
i64.const 2
i64.eq
br_if 6 (;@3;)
local.get 1
i32.load offset=36664
i32.const 2
i32.ne
br_if 1 (;@8;)
br 6 (;@3;)
end
block  ;; label = @9
local.get 1
i32.const 42572
i32.add
local.tee 2
i32.load
local.tee 4
i32.const -1
i32.eq
br_if 0 (;@9;)
local.get 4
if  ;; label = @10
local.get 2
i32.load offset=4
local.get 4
i32.const 3
i32.shl
call 42646
end
local.get 2
i32.load offset=12
local.tee 4
i32.eqz
br_if 0 (;@9;)
local.get 2
i32.load offset=16
local.get 4
i32.const 3
i32.shl
call 42646
end
local.get 1
i32.const -1
i32.store offset=42572
local.get 3
i32.const 4710996
i32.const 8
call 29994
local.get 1
i32.const 36272
i32.add
local.get 3
i32.load offset=4
local.tee 1
local.get 3
i32.load offset=8
call 47608
local.get 3
i32.load
local.tee 2
i32.const 0
i32.gt_s
if  ;; label = @9
local.get 1
local.get 2
call 42646
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 7 (;@1;)
end
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 5
i32.ge_u
br_if 3 (;@4;)
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
i32.load offset=37336
i32.eqz
br_if 4 (;@3;)
local.get 3
i64.const 11
i64.store
local.get 3
i32.const 6640
i32.add
local.get 1
local.get 3
call 1078
local.get 0
local.get 3
i32.load offset=6648
i32.store offset=8
local.get 0
local.get 3
i64.load offset=6640 align=4
i64.store align=4
br 6 (;@1;)
end
local.get 2
local.get 4
i32.const 4710648
call 43764
unreachable
end
local.get 2
local.get 4
i32.const 4710680
call 43764
unreachable
end
local.get 3
i64.const 0
i64.store
local.get 1
local.get 3
call 5830
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 3 (;@1;)
end
local.get 2
local.get 5
i32.const 4710696
call 43764
unreachable
end
block  ;; label = @3
block  ;; label = @4
block  ;; label = @5
block  ;; label = @6
block  ;; label = @7
block  ;; label = @8
block  ;; label = @9
block  ;; label = @10
block  ;; label = @11
block  ;; label = @12
block  ;; label = @13
block  ;; label = @14
block  ;; label = @15
block  ;; label = @16
block  ;; label = @17
block  ;; label = @18
local.get 1
i64.load offset=32640
i64.const 2
i64.ne
if  ;; label = @19
local.get 1
i32.load8_u offset=33877
local.get 1
i32.const 255
i32.store8 offset=33877
i32.const 255
i32.ne
br_if 1 (;@18;)
local.get 1
i32.load8_u offset=33872
local.get 1
i32.const 0
i32.store8 offset=33872
br_if 1 (;@18;)
local.get 1
call 33421
local.get 0
local.get 1
i32.const 0
call 21490
br 18 (;@1;)
end
local.get 1
i64.load offset=6592
i64.const 2
i64.ne
br_if 1 (;@17;)
local.get 1
i32.load offset=36528
local.set 2
local.get 1
i32.const 0
i32.store offset=36528
block  ;; label = @19
block  ;; label = @20
block  ;; label = @21
local.get 2
i32.eqz
if  ;; label = @22
local.get 1
i32.load offset=46960
local.set 2
local.get 1
i32.const -1
i32.store offset=46960
local.get 2
i32.const 1
i32.add
br_table 3 (;@19;) 2 (;@20;) 1 (;@21;)
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 20 (;@1;)
end
local.get 1
i32.load offset=46964
local.get 2
call 42646
end
local.get 3
i32.const 4710996
i32.const 8
call 29994
local.get 1
i32.const 36272
i32.add
local.get 3
i32.load offset=4
local.tee 1
local.get 3
i32.load offset=8
call 47608
local.get 3
i32.load
local.tee 2
i32.const 0
i32.gt_s
if  ;; label = @20
local.get 1
local.get 2
call 42646
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 18 (;@1;)
end
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 6
i32.ge_u
if  ;; label = @19
local.get 2
local.get 6
i32.const 4710712
call 43764
unreachable
end
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
local.tee 5
i32.load offset=37336
i32.eqz
br_if 2 (;@16;)
br 3 (;@15;)
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 16 (;@1;)
end
block  ;; label = @17
local.get 1
i64.load offset=6592
i64.const 2
i64.eq
br_if 0 (;@17;)
local.get 1
i32.load offset=7096
local.tee 2
if  ;; label = @18
local.get 1
i32.load offset=7100
local.get 2
call 42646
end
local.get 1
i64.load offset=6608
i64.const 2
i64.eq
br_if 0 (;@17;)
local.get 1
i32.const 6608
i32.add
call 25714
local.get 1
i32.load offset=7024
local.tee 2
if  ;; label = @18
local.get 1
i32.load offset=7028
local.get 2
call 42646
end
local.get 1
i32.load offset=7036
local.tee 2
i32.eqz
br_if 0 (;@17;)
local.get 1
i32.load offset=7040
local.get 2
call 42646
end
local.get 1
i64.const 2
i64.store offset=6592
local.get 0
local.get 1
i32.const 0
call 21490
br 15 (;@1;)
end
local.get 1
i32.load8_u offset=47983
i32.const 255
i32.ne
local.tee 7
i32.eqz
if  ;; label = @16
local.get 1
i32.load8_u offset=47879
i32.const 1
i32.and
i32.eqz
br_if 1 (;@15;)
end
local.get 1
i32.const 255
i32.store8 offset=47983
local.get 7
br_if 1 (;@14;)
br 12 (;@3;)
end
block  ;; label = @15
local.get 5
i32.load8_u offset=38015
local.tee 6
br_if 0 (;@15;)
local.get 5
i32.load8_u offset=38016
br_if 0 (;@15;)
local.get 5
i32.load8_u offset=38017
br_if 0 (;@15;)
local.get 1
i32.load offset=40992
local.set 2
local.get 1
i32.const -1
i32.store offset=40992
local.get 2
i32.const 1
i32.sub
i32.const -3
i32.le_u
if  ;; label = @16
local.get 1
i32.load offset=40996
local.get 2
i32.const 12
i32.mul
call 42646
br 12 (;@4;)
end
local.get 2
i32.const -1
i32.ne
br_if 11 (;@4;)
local.get 1
i64.load offset=37552
local.set 8
local.get 1
i32.const 2
i32.store offset=37552
local.get 3
local.get 1
i64.load offset=37584
i64.store offset=32
local.get 3
local.get 1
i64.load offset=37576
i64.store offset=24
local.get 3
local.get 1
i64.load offset=37568
i64.store offset=16
local.get 3
local.get 1
i64.load offset=37560
i64.store offset=8
local.get 3
local.get 8
i64.store
local.get 3
call 39033
local.get 8
i32.wrap_i64
i32.const 2
i32.ne
br_if 2 (;@13;)
local.get 1
i64.load offset=37512
local.set 8
local.get 1
i32.const 2
i32.store offset=37512
local.get 3
local.get 1
i64.load offset=37544
i64.store offset=32
local.get 3
local.get 1
i64.load offset=37536
i64.store offset=24
local.get 3
local.get 1
i64.load offset=37528
i64.store offset=16
local.get 3
local.get 1
i64.load offset=37520
i64.store offset=8
local.get 3
local.get 8
i64.store
local.get 3
call 40954
local.get 8
i32.wrap_i64
i32.const 2
i32.ne
br_if 3 (;@12;)
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 4
i32.ge_u
br_if 4 (;@11;)
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
i64.load offset=14400
i64.const 2
i64.eq
br_if 10 (;@5;)
local.get 1
i32.const 0
i32.store offset=36352
local.get 1
i32.const 255
i32.store8 offset=42964
local.get 1
call 3691
i32.eqz
br_if 10 (;@5;)
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 14 (;@1;)
end
local.get 5
i32.const 0
i32.store8 offset=38015
local.get 2
local.get 1
i32.load offset=43992
local.tee 5
i32.ge_u
br_if 4 (;@10;)
local.get 2
i32.const 38032
i32.mul
local.tee 5
local.get 1
i32.load offset=43988
i32.add
i32.const 0
i32.store8 offset=38016
local.get 2
local.get 1
i32.load offset=43992
local.tee 7
i32.ge_u
br_if 5 (;@9;)
local.get 1
i32.load offset=43988
local.get 5
i32.add
i32.const 0
i32.store8 offset=38017
local.get 2
local.get 1
i32.load offset=43992
local.tee 7
i32.ge_u
br_if 6 (;@8;)
local.get 5
local.get 1
i32.load offset=43988
i32.add
i32.load offset=11976
local.tee 2
i32.load offset=8
br_if 7 (;@7;)
local.get 2
i32.const 0
i32.store offset=280
local.get 2
i32.const 0
i32.store8 offset=310
local.get 2
i64.const 0
i64.store offset=112
local.get 2
i32.const 0
i32.store offset=48
local.get 2
i32.const 0
i32.store8 offset=105
local.get 2
i32.const 0
i32.store offset=60
local.get 2
i64.const 0
i64.store offset=16
local.get 6
i32.eqz
br_if 8 (;@6;)
local.get 3
i32.const 4710936
i32.const 10
call 29994
local.get 1
i32.const 36272
i32.add
local.get 3
i32.load offset=4
local.tee 1
local.get 3
i32.load offset=8
call 39849
local.get 3
i32.load
local.tee 2
i32.const 0
i32.le_s
br_if 8 (;@6;)
local.get 1
local.get 2
call 42646
br 8 (;@6;)
end
local.get 5
call 6541
local.get 1
i32.load offset=43992
local.tee 4
local.get 2
i32.gt_u
if  ;; label = @14
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
local.tee 4
local.get 4
i64.load offset=11024
i64.const 1
i64.add
i64.store offset=11024
local.get 1
i32.load offset=43992
local.set 6
br 11 (;@3;)
end
local.get 2
local.get 4
i32.const 4710964
call 43764
unreachable
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 11 (;@1;)
end
local.get 1
i32.const 37552
i32.add
local.tee 1
call 39033
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
local.get 1
i32.const 2
i32.store
br 10 (;@1;)
end
local.get 2
local.get 4
i32.const 4710728
call 43764
unreachable
end
local.get 2
local.get 5
i32.const 4710888
call 43764
unreachable
end
local.get 2
local.get 7
i32.const 4710904
call 43764
unreachable
end
local.get 2
local.get 7
i32.const 4710920
call 43764
unreachable
end
i32.const 4710948
call 47713
unreachable
end
local.get 4
call 48036
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 4 (;@1;)
end
local.get 1
i32.load8_u offset=42964
local.set 2
local.get 1
i32.const 255
i32.store8 offset=42964
block  ;; label = @5
block  ;; label = @6
block  ;; label = @7
block  ;; label = @8
block  ;; label = @9
block  ;; label = @10
block  ;; label = @11
block  ;; label = @12
block  ;; label = @13
block  ;; label = @14
local.get 2
i32.const 255
i32.eq
if  ;; label = @15
local.get 1
call 3691
br_if 1 (;@14;)
local.get 1
i32.load offset=43496
i32.const 2
i32.ne
br_if 2 (;@13;)
local.get 1
i32.load offset=43676
i32.const -1
i32.ne
br_if 3 (;@12;)
local.get 1
i32.load offset=47632
local.tee 4
local.get 1
i32.load offset=43992
local.tee 2
i32.ge_u
br_if 4 (;@11;)
local.get 1
i32.load offset=43988
local.get 4
i32.const 38032
i32.mul
i32.add
i32.load offset=11976
local.tee 2
i32.load offset=8
br_if 5 (;@10;)
local.get 2
i32.const -1
i32.store offset=8
local.get 2
i32.load offset=144
br_if 6 (;@9;)
local.get 2
i32.const 0
i32.store offset=8
local.get 1
i64.load offset=40752
local.set 8
local.get 1
i32.const -1
i32.store offset=40752
local.get 3
local.get 1
i64.load offset=40768
i64.store offset=16
local.get 3
local.get 1
i64.load offset=40760
i64.store offset=8
local.get 3
local.get 8
i64.store
local.get 3
call 46327
local.get 8
i32.wrap_i64
i32.const -1
i32.ne
br_if 7 (;@8;)
local.get 4
local.get 1
i32.load offset=43992
local.tee 2
i32.ge_u
br_if 8 (;@7;)
local.get 1
i32.load offset=43988
local.get 4
i32.const 38032
i32.mul
i32.add
local.tee 2
i32.load offset=37336
i32.eqz
br_if 9 (;@6;)
br 10 (;@5;)
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
local.get 1
i32.const 0
i32.store offset=36352
br 13 (;@1;)
end
local.get 1
call 2192
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 12 (;@1;)
end
local.get 3
i32.const 999
i32.store
local.get 0
local.get 1
local.get 3
call 1006
br 11 (;@1;)
end
local.get 3
i32.const 3
i32.store
local.get 0
local.get 1
local.get 3
call 1297
br 10 (;@1;)
end
local.get 4
local.get 2
i32.const 4710744
call 43764
unreachable
end
i32.const 4710872
call 47713
unreachable
end
local.get 2
i32.const 2
i32.store8 offset=181
local.get 2
i32.const 65535
i32.store16 offset=164
local.get 2
i32.const 0
i32.store offset=156
local.get 2
i32.const 0
i32.store offset=144
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
local.get 2
i32.const 0
i32.store offset=8
br 7 (;@1;)
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 6 (;@1;)
end
local.get 4
local.get 2
i32.const 4710760
call 43764
unreachable
end
local.get 2
i64.load offset=12968
i64.const -1
i64.eq
br_if 0 (;@5;)
local.get 3
local.get 2
i32.const 12968
i32.add
call 38836
local.get 3
i32.const 6640
i32.add
local.get 2
i32.const 13392
i32.add
local.get 3
call 40833
local.get 3
i32.load offset=6640
local.tee 2
i32.const -1
i32.ne
if  ;; label = @6
local.get 2
if  ;; label = @7
local.get 3
i32.load offset=6644
local.get 2
call 42646
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
local.get 3
i64.load
i64.const 6
i64.and
i64.const 4
i64.ne
br_if 5 (;@1;)
local.get 3
i32.load offset=8
local.tee 0
i32.eqz
br_if 5 (;@1;)
local.get 3
i32.load offset=12
local.get 0
call 42646
br 5 (;@1;)
end
local.get 3
i64.load
i64.const 6
i64.and
i64.const 4
i64.ne
br_if 0 (;@5;)
local.get 3
i32.load offset=8
local.tee 2
i32.eqz
br_if 0 (;@5;)
local.get 3
i32.load offset=12
local.get 2
call 42646
end
local.get 1
i32.load offset=36352
if  ;; label = @5
local.get 1
i32.const 0
i32.store8 offset=36517
local.get 1
i32.const 0
i32.store offset=36280
local.get 1
i32.const 0
i32.store offset=36352
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 4 (;@1;)
end
block  ;; label = @5
block  ;; label = @6
block  ;; label = @7
block  ;; label = @8
block  ;; label = @9
local.get 1
i32.load offset=47632
local.tee 2
local.get 1
i32.load offset=43992
local.tee 4
i32.lt_u
if  ;; label = @10
local.get 2
i32.const 38032
i32.mul
local.tee 4
local.get 1
i32.load offset=43988
i32.add
local.tee 5
i32.load offset=37336
local.tee 6
i32.eqz
if  ;; label = @11
local.get 5
i64.const 0
i64.store offset=14208
local.get 2
local.get 1
i32.load offset=43992
local.tee 5
i32.ge_u
br_if 2 (;@9;)
local.get 1
i32.load offset=43988
local.get 4
i32.add
call 25109
local.get 2
local.get 1
i32.load offset=43992
local.tee 5
i32.ge_u
br_if 3 (;@8;)
local.get 1
i32.load offset=43988
local.get 4
i32.add
i64.const 0
i64.store offset=24000
local.get 1
call 882
local.get 2
local.get 1
i32.load offset=43992
local.tee 5
i32.ge_u
br_if 4 (;@7;)
local.get 1
i32.load offset=43988
local.get 4
i32.add
call 33309
local.get 2
local.get 1
i32.load offset=43992
local.tee 5
i32.ge_u
br_if 5 (;@6;)
local.get 1
i32.load offset=43988
local.get 4
i32.add
i32.load offset=11976
local.tee 1
i32.load offset=8
br_if 6 (;@5;)
local.get 1
i32.const 0
i32.store8 offset=104
local.get 1
i32.const 0
i32.store offset=60
local.get 1
i64.const 0
i64.store offset=16
local.get 1
i32.const 0
i32.store offset=48
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
br 10 (;@1;)
end
local.get 3
i32.const 4560
i32.add
local.tee 2
local.get 6
local.get 5
i32.const 37340
i32.add
i32.load
i32.load offset=112
call_indirect (type 0)
local.get 3
local.get 3
i64.load offset=4560
i64.store
local.get 3
i32.const 8
i32.or
local.get 2
i32.const 8
i32.or
i32.const 2072
memory.copy
local.get 0
local.get 1
local.get 3
call 1593
br 9 (;@1;)
end
local.get 2
local.get 4
i32.const 4710776
call 43764
unreachable
end
local.get 2
local.get 5
i32.const 4710792
call 43764
unreachable
end
local.get 2
local.get 5
i32.const 4710808
call 43764
unreachable
end
local.get 2
local.get 5
i32.const 4710824
call 43764
unreachable
end
local.get 2
local.get 5
i32.const 4710840
call 43764
unreachable
end
i32.const 4710856
call 47713
unreachable
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
local.get 1
i32.const -1
i32.store offset=27064
br 2 (;@1;)
end
local.get 1
i32.const 0
i32.store16 offset=47878
local.get 2
local.get 6
i32.lt_u
if  ;; label = @3
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
local.get 1
i32.load offset=43988
local.get 2
i32.const 38032
i32.mul
i32.add
i64.const 2
i64.store offset=24040
br 2 (;@1;)
end
local.get 2
local.get 6
i32.const 4710980
call 43764
unreachable
end
local.get 0
i32.const 0
i32.store offset=8
local.get 0
i32.const 0
i32.store
end
local.get 3
i32.const 6656
i32.add
global.set 0)
