---
title:  "Type Pool"
date:   '2014-09-10'
categories: architecture
tags:
- architecture
disqus_id: 548d3b4e-79a9-4f82-981e-5603ba89738e
withStats: true
aliases: [
    "/architecture/2014/09/10/typepool.html"
]
---

The Type Pool concept comes from working with the [Fubu code base](https://github.com/DarthFubuMVC/fubumvc/blob/master/src/FubuMVC.Core/Registration/TypePool.cs)
its a pretty simple class that I find makes type scanning much simpler.

{{< highlight csharp >}}
namespace v23athletics.infrastructure.types
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using Fasterflect;

    public class TypePool
    {
        readonly IList<Assembly> _assemblies;
        Lazy<IEnumerable<Type>> _types;

        public TypePool(params Assembly[] assemblies)
        {
            _assemblies = new List<Assembly>(assemblies);
            _types = new Lazy<IEnumerable<Type>>(buildUp);
        }
        public TypePool() : this(new Assembly[0])
        {
        }

        public Assembly[] Assemblies { get { return _assemblies.ToArray(); } }

        //add a source to scan.
        public void AddSource(Assembly assembly)
        {
            _assemblies.Add(assembly);
            _types = new Lazy<IEnumerable<Type>>(buildUp);
        }

        //for LINQ queries
        public IEnumerable<Type> Query()
        {
            return _types.Value;
        }

        //if you want to have the scans be seperate testable classes
        public IEnumerable<Type> Scan<TScanner>() where TScanner : TypeScan, new()
        {
            var scanner = new TScanner();
            return _types.Value.Where(scanner.Matches);
        }

        public IEnumerable<Type> Scan(Func<Type, bool> predicate)
        {
            return _types.Value.Where(predicate);
        }

        //function to build the types up lazily
        IEnumerable<Type> buildUp()
        {
            return _assemblies.SelectMany(a => a.ExportedTypes);
        }

        public IEnumerable<Type> FindImplementorsOf<TInterface>()
        {
            return Scan(t => t.Implements<TInterface>());
        }
    }
}
{{< /highlight >}}

{{< highlight csharp >}}

var typePool = new TypePool(typeof(MarkerType).Assembly);
var settingTypes = typePool.Query().Where(t=>t.Name.EndsWith("Settings"));

{{< /highlight >}}

I use this guy to help me find types so that i can register them in my IoC
container. Now most containers have their own scanning conventions, but one thing
they tend to lack is a way to pass around the 'Application Assemblies' which is
is something the TypePool can do. By passing the TypePool into the lower services
or IoC 'Registries' I can use there scanning capabilities or I can use my own.


{{< highlight csharp >}}

public class MySubRegistry : Registry
{
    public MySubRegistry(TypePool pool)
    {
        Scan(scanner =>
        {
            scanner.AddAllTypes<IService>();
            foreach(var ass in pool.Assemblies)
                scanner.Assembly(ass);
        })
    }
}

public class MySubModule : Module
{
  TypePool _pool;

  public MySubModule(TypePool pool)
  {
    _pool = pool;
  }

  public void RegisterComponents(ContainerBuilder builder)
  {
      var types = _pool.Query().Where( t => t.Implements<IService>());
      builder.RegisterTypes(types)
          .As<IService>();
  }
}
}
{{< /highlight >}}
