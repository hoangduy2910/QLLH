using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using QLLH.DAL.Models;
using System.Linq;

namespace QLLH.DAL 
{
    public class ThoiKhoaBieuRep : GenericRep<QuanLyLopHocContext, ThoiKhoaBieu>
    {
        public override ThoiKhoaBieu Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaTkb == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaTkb == id);
            m = Delete(m);
            return m.MaTkb;
        }
    }
}
