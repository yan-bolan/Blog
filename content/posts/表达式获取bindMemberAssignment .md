+++
title = "表达式来有判断有设定哪些栏位"
date = "2025-03-30 20:14:35"
slug = "cfc5842dd"
aliases = ["/2025/03_30_cfc5842dd.html"]
[taxonomies]
tags = ["c#"]
[extra]
cover = "https://picsum.photos/400"
+++
通过表达式来有判断 有设定哪些栏位

```c#
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using SqlSugar;
//new一个YourEntity对象，并设置Id和Name属性，其他属性不设置
 UpdateHelper .GetSetProperties<YourEntity>(it=>  new YourEntity { Id = 0, Name = "NewName"  });


//judged whether the Name property has been modified.

  static class UpdateHelper
{
    // 通过表达式树直接获取被设置的属性名（无需依赖值比较）
    public static List<string> DynamicSetColumns<T>(  Expression<Func<T, T>> columns)
        where T : class, new()
    {
        //MemberAssignment 
        // 使用 ExpressionTool 提取表达式中被设置的属性名
        var properties = ExpressionTool.GetNewExpressionItemList(columns)
            .Select(kvp => kvp.Key) // 提取属性名（如 "Id", "SchoolId", "Name"）
            .ToList();

        return properties;
    }
    //    GetSetProperties 方法：
    //解析表达式树：
    //expression.Body 是表达式树的主体，必须是 MemberInitExpression（即 new T { ... }
    //形式的初始化表达式）。
    //遍历绑定项：
    //memberInit.Bindings 是表达式中所有绑定项的集合（如 Id = 1, Name = "test"）。
    //每个绑定项是 MemberBinding 的子类，其中 MemberAssignment 表示属性赋值。
    //提取属性名：
    //对于每个 MemberAssignment，通过 assignment.Member.Name 获取属性名（如 "Id"、"Name"）。
    public static IEnumerable<string> GetSetProperties<T>(Expression<Func<T, T>> expression)
    {
        // 确保表达式是 MemberInitExpression（如 new T { ... }）
        var memberInit = expression.Body as MemberInitExpression;
        if (memberInit == null)
        {
            throw new ArgumentException("Expression must be a MemberInitExpression (e.g., new T { ... })");
        }
        var properties = new List<string>();
        // 遍历所有绑定项，提取属性名
        foreach (var binding in memberInit.Bindings)
        {
            // 只处理属性赋值（MemberAssignment）
            if (binding is MemberAssignment assignment)
            {
                //yield return assignment.Member.Name;
                properties.Add(assignment.Member.Name);
            }
        }
        return properties;
    }

// MemberBinding 的类型
//MemberBinding 是一个抽象基类，包含以下三种具体类型：

//MemberAssignment ：表示对属性或字段的赋值（如 it.Name = "Alice"）。
//MemberListBinding ：表示对集合属性的初始化（如 it.Tags = new[] { "tag1", "tag2" }）。
//MemberMemberBinding ：表示对嵌套对象的初始化（如 it.Address = new Address { City = "Beijing" }）。

}
public static class ExpressionHelper
{
    // 解析表达式树，提取所有被设置的属性名（支持嵌套和集合）
    public static List<string> GetSetProperties<T>(Expression<Func<T, T>> expression)
    {
        var memberInit = expression.Body as MemberInitExpression;
        if (memberInit == null)
        {
            throw new ArgumentException("Expression must be a MemberInitExpression (e.g., new T { ... })");
        }

        var properties = new List<string>();
        foreach (var binding in memberInit.Bindings)
        {
            switch (binding)
            {
                case MemberAssignment assignment:
                    // 属性或字段赋值（如 Name = "Alice"）
                    properties.Add(assignment.Member.Name);
                    break;
                case MemberListBinding listBinding:
                    // 集合初始化（如 Tags = new[] { ... }）
                    properties.Add(listBinding.Member.Name);
                    break;
                case MemberMemberBinding memberBinding:
                    // 嵌套对象初始化（如 Address = new Address { ... }）
                    properties.Add(memberBinding.Member.Name);
                    // 可递归解析嵌套的 MemberBinding
                    properties.AddRange(GetNestedProperties(memberBinding.Bindings));
                    break;
            }
        }
        return properties;
    }

    private static IEnumerable<string> GetNestedProperties(IEnumerable<MemberBinding> bindings)
    {
        foreach (var binding in bindings)
        {
            if (binding is MemberAssignment assignment)
            {
                yield return assignment.Member.Name;
            }
        }
    }
}

internal class YourEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime ModifiedTime { get; set; }
    public bool IsDeleted { get; set; }
    public int Version { get; set; }
}
```
