---
title:  "Application Instance"
date:   '2014-09-11'
categories: architecture
tags:
- architecture
disqus_id: 08ce23a5-687d-4dc0-8d9e-921ff8270590
withStats: true
aliases: [
  "/architecture/2014/09/11/app-instance.html"
]
---

So, if [IoC is the Context](% post_url 2013-12-09-ioc-as-context %}) how do we
leverage this concept so we can package it up nicely in our code bases. The goal
is to use this context to unlock new aspects.

I have an application factory class that generates application instances.

The factory is responsible for bootstrapping the logging, doing all of the
assembly scanning, then passes a [TypePool](% post_url 2014-09-10-typepool %}) and the container into the application.

{{< highlight csharp >}}
public static class AppFactory
{
  public static Application Build<TApplication>()
      where TApplication : ApplicationMarker, new()
  {
    //boot strap logging

    var pool = new TypePool();
    //collect all assemblies for this host

    var container = new Container();
    //build up container

    return new ApplicationInstance(container, pool);
  }
}
{{< /highlight >}}

The application instance looks like this

{{< highlight csharp >}}
public interface Application : IDisposable
{
  void Start();
  TComponent Resolve<TComponent>();
  void Scope(Action<ILifetimeScope> action);
  void Dispatch(Request request);
}
{{< /highlight >}}

The Start method looks like

{{< highlight csharp >}}
public class ApplicationInstance : Application
{
  public void Start()
  {
    //run db migrations

    //run all bootup code
  }

  //other stuff
}
{{< /highlight >}}

The ApplicationMarker looks like


{{< highlight csharp >}}
public interface ApplicationMarker
{
  void ConfigureContainer(TypePool pool, ContainerBuilder builder);
}
{{< /highlight >}}

Benefits include super simple testing
a predictable and shared common architecture across command line apps
web apps / messaging apps (this is very nice for larger companies)

In integration tests I can say things like:

{{< highlight csharp >}}
public class SampleTest
{
  [Test]
  public void Test()
  {
    var app = AppFactory.Build<MyApplication>();
    var sut = app.Resolve<TheSystemToTest>();
    var result = sut.TheMethodToTest(some, parameters);
    result.ShouldNotBeNull();
  }
}
{{< /highlight >}}

Now I know that my app instance is the same as how its going to be built in
in test as it is in the application host.
