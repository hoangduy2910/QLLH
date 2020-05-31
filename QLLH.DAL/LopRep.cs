using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;

namespace QLLH.DAL
{
    using Models;
    using QLLH.Common.Rsp;
    public class LopRep : GenericRep<QuanLyLopHocContext, Lop>
    {
        public override Lop Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaLop == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaLop == id);
            m = Delete(m);
            return m.MaLop;
        }
    }
}
