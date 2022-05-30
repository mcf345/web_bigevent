$(function() {
    //登录注册切换功能
    $('#link_reg').click(()=>{
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').click(()=>{
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //引入form模块
    const form = layui.form
    const layer = layui.layer

    // 设置请求根路径
    // const baseUrl = "http://www.liulongbin.top:3007";

    //自定义检测规则
    form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],

    repwd: (value) => {
        //1、获取当前输入的值
        //2、获取密码框的值
        //3、两者进行判定
        //4、如果两者不一致，提示消息
        const pwd = $('#form_reg [name=password]').val()
        if(pwd !== value ) return '两次密码不一致'
    }

    })

    //监听注册表单，发送注册请求
    $('#form_reg').on('submit',(e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'/api/reguser',
            data:{
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res)=>{
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功')
                // 注册成功后跳转到登录界面
            $("#link_login").click();
            }
        })
    })


    //登录功能
    $('#form_login').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success: res => {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功')
                //登录成功后需要把 token 令牌存放在本地
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
                // console.log(res);
            }
        })
    })

})