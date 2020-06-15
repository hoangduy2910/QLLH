using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using QLLH.DAL.Models;
using System.Linq;

namespace QLLH.DAL 
{
    using Models;
    using QLLH.Common.Rsp;
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

        public SingleRsp CreateThoiKhoaBieu(ThoiKhoaBieu tkb)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGVL = context.ThoiKhoaBieu.Add(tkb);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp UpdateThoiKhoaBieu(ThoiKhoaBieu tkb)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGVL = context.ThoiKhoaBieu.Update(tkb);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp RemoveThoiKhoaBieu(ThoiKhoaBieu tkb)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newGVL = context.ThoiKhoaBieu.Remove(tkb);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
    }
}
