(func (;20386;) (type 2) (param i32 i32 i32)
(local i32 i32 i32 i32 i32 i32 i32 i64 f32 f32)
global.get 0
i32.const 16
i32.sub
local.tee 4
global.set 0
block  ;; label = @1
local.get 1
i32.load offset=852
i32.const -1
i32.eq
br_if 0 (;@1;)
local.get 1
i32.load offset=860
i32.const 8
i32.ne
br_if 0 (;@1;)
local.get 1
i32.load offset=856
i64.load align=1
i64.const 6146926740021203009
i64.eq
local.set 8
end
block  ;; label = @1
block  ;; label = @2
block  ;; label = @3
block  ;; label = @4
block  ;; label = @5
i32.const 12
i32.const 4
call 49826
local.tee 3
block (result i32)  ;; label = @6
local.get 2
i32.eqz
if  ;; label = @7
local.get 3
if  ;; label = @8
i64.const 4647714816524288000
local.set 10
i32.const 1077936128
local.set 9
f32.const 0x1.8p+3 (;=12;)
local.set 11
f32.const 0x1.ep+4 (;=30;)
local.set 12
i32.const 1
br 2 (;@6;)
end
i32.const 4
i32.const 12
call 53972
unreachable
end
local.get 3
i32.eqz
br_if 1 (;@5;)
i64.const 4665729215042158592
local.set 10
f32.const 0x1.3p+5 (;=38;)
local.set 12
f32.const 0x1.3p+5 (;=38;)
local.set 11
i32.const 0
end
i32.store8 offset=8
local.get 3
local.get 11
f32.store offset=4
local.get 3
local.get 12
f32.store
local.get 4
i32.const 8
i32.add
call 51977
local.get 4
i32.load offset=12
local.set 1
local.get 4
i32.load offset=8
local.set 6
i32.const 8
i32.const 1
call 49826
local.tee 7
i32.eqz
br_if 1 (;@4;)
local.get 7
i64.const 6146926740021203009
i64.store align=1
i32.const 8
i32.const 4
call 49826
local.tee 5
i32.eqz
br_if 2 (;@3;)
local.get 5
local.get 2
i32.store8 offset=5
local.get 5
local.get 8
i32.store8 offset=4
local.get 5
local.get 9
i32.store
local.get 1
i32.load
local.tee 2
if  ;; label = @6
local.get 6
local.get 2
call_indirect (type 1)
end
local.get 1
i32.load offset=4
local.tee 2
if  ;; label = @6
local.get 1
i32.load offset=8
drop
local.get 6
local.get 2
call 42646
end
i32.const 4632
i32.const 8
call 49826
local.tee 1
i32.eqz
br_if 3 (;@2;)
local.get 1
local.get 10
i64.store offset=4608
local.get 1
i64.const 65280
i64.store offset=4624
local.get 1
i32.const 28209112
i32.store offset=4604
local.get 1
local.get 5
i32.store offset=4600
local.get 1
i32.const 9007580
i32.store offset=4596
local.get 1
local.get 3
i32.store offset=4592
local.get 1
i32.const 8
i32.store offset=44
local.get 1
local.get 7
i32.store offset=40
local.get 1
i64.const 34359739078
i64.store offset=32
local.get 1
i32.const 3
i32.store offset=16
local.get 1
i32.const 3
i32.store
local.get 1
local.get 10
i64.store offset=4616
i32.const 20
i32.const 4
call 49826
local.tee 2
i32.eqz
br_if 4 (;@1;)
local.get 2
i32.const 8958584
i32.store offset=16
local.get 2
local.get 1
i32.store offset=12
local.get 2
i32.const 8
i32.store offset=8
local.get 2
i32.const 9002960
i32.store offset=4
local.get 2
i32.const -1
i32.store
local.get 0
i32.const 9396744
i32.store offset=4
local.get 0
local.get 2
i32.store
local.get 4
i32.const 16
i32.add
global.set 0
return
end
i32.const 4
i32.const 12
call 53972
unreachable
end
i32.const 1
i32.const 8
call 50318
unreachable
end
i32.const 4
i32.const 8
call 53972
unreachable
end
i32.const 8
i32.const 4632
call 53972
unreachable
end
i32.const 4
i32.const 20
call 53972
unreachable)
