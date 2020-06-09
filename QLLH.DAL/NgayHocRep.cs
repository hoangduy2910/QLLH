using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;
using QLLH.DAL.Models;

namespace QLLH.DAL
{
    public class NgayHocRep : GenericRep<QuanLyLopHocContext, NgayHoc>
    {
        public override NgayHoc Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaNgay == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaNgay == id);
            m = Delete(m);
            return m.MaNgay;
        }
    }
}
