"ui";
// 定义账号列表变量
var accountList = [];

// 添加UI组件
ui.layout(
    <vertical padding="16">
        <text text="请添加账号：" textColor="black" textSize="18sp" marginBottom="16"/>
        <input id="input"/>
        <button id="add" text="添加" marginTop="16" style="Widget.AppCompat.Button.Colored"/>
        <text id="list" textColor="green" textSize="16sp" marginTop="16"/>
        <horizontal marginTop="16">
            <button id="delete" text="删除账号" style="Widget.AppCompat.Button.Colored"/>
            <button id="save" text="保存账号" style="Widget.AppCompat.Button.Colored"/>
        </horizontal>
    </vertical>
);

// 获取UI组件
var input = ui.input;
var addBtn = ui.add;
var deleteBtn = ui.delete;
var saveBtn = ui.save;
var accountText = ui.list;

// 添加按钮的点击事件
addBtn.click(() => {
    var value = input.text();
    if (value) {
        // 如果输入框不为空，则添加账号到列表中
        accountList.push(value);
        input.setText("");
        // 更新账号列表文本框中的内容
        accountText.setText(accountList.toString());
    }
});

// 删除按钮的点击事件
deleteBtn.click(() => {
    var value = input.text();
    if (value) {
        var index = accountList.indexOf(value);
        if (index !== -1) {
            // 如果该账号存在，则从列表中删除
            accountList.splice(index, 1);
            input.setText("");
            // 更新账号列表文本框中的内容
            accountText.setText(accountList.toString());
        }
    }
});

// 保存按钮的点击事件
saveBtn.click(() => {
    if (accountList.length > 0) {
        // 将账号列表保存到本地存储
        storage.put("accountList", accountList);
        toast("账号已保存");
    } else {
        toast("账号列表为空，无需保存");
    }
});

// 初始时从本地存储中恢复账号列表
//accountList = storage.get("accountList", []);
// 更新账号列表文本框中的内容
accountText.setText(accountList.toString());