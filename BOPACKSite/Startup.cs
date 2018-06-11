using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BOPACKSite.Startup))]
namespace BOPACKSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

        }
    }
}
